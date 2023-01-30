
const searchInput = document.querySelector('input');

document.getElementById('showResults').addEventListener('click',function(){
    fetchData();
    searchInput.value = ''
    this.disabled = true;
})

searchInput.addEventListener('focus',function(){
    document.getElementById('showResults').disabled = false
})

searchInput.addEventListener('keypress',function(e){
    if(e.key =="Enter"){
        fetchData();
        searchInput.value = ''
        e.preventDefault();
    }
})

function fetchData(){
    const songSearch = document.querySelector('input').value
    if(songSearch != ''){
        fetch(' https://api.lyrics.ovh/suggest/'+songSearch)
        .then(res => res.json())
        .then(fetchData =>{
                    showData(fetchData);
        }) 
    }
}
   
function showData(fetchData){
        const songs = fetchData.data; 
        const selectedSongs = songs.slice(0,10)
        const songsContainer = document.getElementById('search-results');
        songsContainer.innerHTML = '';
        if(selectedSongs ==''){
            document.getElementById('showLyric').innerText = '0 result found'
        }else{
            selectedSongs.forEach(song => {
                const singleSong = document.createElement('div')
                singleSong.classList.add('single-result','row','align-items-center','my-3','p-3')
                singleSong.innerHTML = `
                                 <div class="col-md-9">
                                     <h3 class="lyrics-name">${song.title}</h3>
                                     <p class="author lead">Album by <span>${song.artist.name}</span></p>
                                     <audio src="${song.preview}" type="audio" controls></audio>
                                 </div>
                                 <div class="col-md-3 text-md-right text-center">
                                     <button class="btn btn-success" onclick="showLyrics('${song.artist.name}','${song.title}')">Get Lyrics</button>
                                 </div>           
                                  </div>`
                songsContainer.appendChild(singleSong)   
            });
        }
}

function showLyrics(artist,title){
        fetch('https://api.lyrics.ovh/v1/'+artist+'/'+title)
        .then(res => res.json())
        .then(data =>{
            if(!data.ok){
                throw "Lyric did not found";
            }
            document.getElementById('showLyric').innerText=data
        } )
        .catch(err =>{
            document.getElementById('showLyric').innerText = err
        } )
}


  