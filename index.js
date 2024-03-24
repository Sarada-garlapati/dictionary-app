let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let loading=document.querySelector(".loader")

const getData = async (searchValue) => {
    loading.style.display="block";
    let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`);
    let jsonData = await data.json();
    console.log(jsonData)

    if(data.status===404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".text").style.display = "none";
    }else{
    document.querySelector(".text").innerHTML=""
    let div = document.createElement("div");
    div.classList.add("detail");
    div.innerHTML=`
            <h2>Word : <span>${jsonData[0].word}</span></h2>
            <p>${jsonData[0].meanings[0].partOfSpeech}</p>
            <p>Meaning : <span>${jsonData[0].meanings[0].definitions[0].definition   }</span></p>
            <p>Example : <span>${jsonData[0].meanings[0].definitions[0].example == undefined ? "Not Found" : jsonData[0].meanings[0].definitions[0].example   }</span></p>
            <p>Synonyms : <span>${jsonData[0].meanings[0].synonyms}</span></p>
            <a href=${jsonData[0].sourceUrls[0]    } target="_blank">Read More</a>
    `
    document.querySelector(".text").appendChild(div)
    console.log(jsonData);
    console.log(jsonData[0].word);
    console.log(jsonData[0].meanings[0].definitions[0].definition       );

    document.querySelector(".text").style.display = "block";
    document.querySelector(".error").style.display = "none";
   
    }
    loading.style.display="none";
}

searchBtn.addEventListener("click", function(){
    let searchValue = searchInput.value;
    if(searchValue == ""){
        alert("First Enter Word")
    }else{
        getData(searchValue)
    }

})
