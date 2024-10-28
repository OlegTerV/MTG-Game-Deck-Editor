class Mtg {

    constructor(baseUrl = "https://api.magicthegathering.io/v1/") {
        this.baseUrl = baseUrl;
    }

    loadCards(){
        return fetch(`${this.baseUrl}cards`)
            .then(response=>response.json())
            .then(json=>json.cards)
    }

    searchCards(name){
        return fetch(`${this.baseUrl}cards?name=`+name)
            .then(response=>response.json())
            .then(json=>json.cards)
    }

    specificCard(id){
        return fetch(`${this.baseUrl}cards/`+id)
            .then(response=>response.json())
            .then(json=>json.card)
    }
}


export {Mtg}
