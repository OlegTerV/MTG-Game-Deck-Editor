import {Mtg} from "./api/mtg";
import {ColorStats} from "./widgets/colorStats";
import {ManaCostStats} from "./widgets/manaCostStats";

let count_of_cards_in_the_deck=0;
cards_in_the_deck = new Map();
cost_count = new Map();
color_count = new Map();
color_count.set('W', 0);
color_count.set('U', 0);
color_count.set('B', 0);
color_count.set('R', 0);
color_count.set('G', 0);
color_count.set('C', 0);
const number_of_cards = document.getElementById('number_of_cards');
document.addEventListener("DOMContentLoaded", setup)
function setup() {
    const mtg = new Mtg();
    mtg.loadCards()
        .then((cards) => {
            const menu = document.getElementById('listContainer');
            const list = document.createElement('ul');
            list.id = "cards_names";  
            cards.forEach(card => {
                const listItem = document.createElement('li');
                listItem.innerHTML = card.name;   
                listItem.id = card.id;
                listItem.classList.add("astext");
                list.appendChild(listItem)
            })
            menu.innerHTML = ''

            menu.appendChild(list);
            let cards_names = document.getElementById('cards_names');
            cards_names.addEventListener("click", card_info);
            new ColorStats().buildStats(document.getElementById("colorStats"));
            new ManaCostStats().buildStats(document.getElementById("manaStats"));
        })
    
}


const search_button = document.getElementById('search-button');
search_button.addEventListener("click", find_cards)

function find_cards() {
    const mtg = new Mtg();
    const name_card = document.getElementById('search-input').value;
    mtg.searchCards(name_card)
        .then((cards) => {
            const menu = document.getElementById('listContainer');
            const list = document.createElement('ul');
            list.id = "cards_names";  
            cards.forEach(card => {
                const listItem = document.createElement('li');
                listItem.innerHTML = card.name;
                listItem.id = card.id;
                listItem.classList.add("astext");
                list.appendChild(listItem)
            })
            menu.innerHTML = ''

            menu.appendChild(list);  
            let cards_names = document.getElementById('cards_names');
            cards_names.addEventListener("click", card_info);           
        })      
}

function card_info(event) {
    //console.log(event.target.id);
    specific_card_id =event.target.id;

    const mtg = new Mtg();
    mtg.specificCard(specific_card_id)
        .then((specific_card) => {
            const specific_card_info = document.getElementById('specific_card_info');
            const image = document.createElement('img');
            image.src=specific_card.imageUrl;        
            
            let width_of_my_block = specific_card_info.offsetWidth
            const info_about_card_english = document.createElement('p');
            info_about_card_english.id ="text_about_card_english";
            info_about_card_english.style = "max-width:"+width_of_my_block+";";
            info_about_card_english.innerHTML=specific_card.text;

            /*
            const info_about_card_russian = document.createElement('p');
            info_about_card_russian.id ="text_about_card_russian";
            info_about_card_russian.style = "width: "+width_of_my_block+";";
            info_about_card_russian.innerHTML=specific_card.foreignNames[6].text;
            specific_card_info.appendChild(info_about_card_russian);
            */

            const button_add_a_card_to_the_deck = document.createElement('button');
            button_add_a_card_to_the_deck.id="button_add_a_card_to_the_deck";
            button_add_a_card_to_the_deck.innerHTML="Add a card to the deck"

            specific_card_info.innerHTML = '';
            specific_card_info.appendChild(image);
            specific_card_info.appendChild(info_about_card_english);
            specific_card_info.appendChild(button_add_a_card_to_the_deck);

            const add_card_button = document.getElementById('button_add_a_card_to_the_deck');
            add_card_button.addEventListener("click", function(event){

            let elements = specific_card.colors[0];
                if (((cards_in_the_deck.has(specific_card.id)==true)&&((cards_in_the_deck.get(specific_card.id)<4)))||(cards_in_the_deck.has(specific_card.id)==false)||(elements=='B')){
                    count_of_cards_in_the_deck++;
                    if ((cards_in_the_deck.has(specific_card.id)==true)&&((cards_in_the_deck.get(specific_card.id)<4))&&(elements!='B')){
                        let val = cards_in_the_deck.get(specific_card.id)+1;
                        cards_in_the_deck.set(specific_card.id, val)
                    }
                    else if ((cards_in_the_deck.has(specific_card.id)==false)&&(elements!='B')){
                        cards_in_the_deck.set(specific_card.id, 1)
                    }
                    data_statistics = rebuildData(parseInt(specific_card.manaCost[1]));
                    new ManaCostStats().buildStats(document.getElementById("manaStats"),data_statistics);

                    data_color = add_color_statistics(specific_card.colorIdentity[0]);
                    new ColorStats().buildStats(document.getElementById("colorStats"), data_color);

                    number_of_cards.innerHTML="Number of cards in deck: "+count_of_cards_in_the_deck;
                    const my_deck = document.getElementById('my_deck');

                    const div_card_of_the_deck = document.createElement('div');
                    div_card_of_the_deck.id = "div_"+specific_card.id;               
                    div_card_of_the_deck.style = "width: "+image.width+"px; float: left;";
                    const div_image = document.createElement('div');
                    //const image_2 = document.createElement('img');
                    //image_2.src=specific_card.imageUrl;  
                    div_image.appendChild(image);
                    
                    const div_remove_card= document.createElement('div');
                    div_remove_card.style = "text-align: center";
                    const remove_card = document.createElement('button');
                    remove_card.id=specific_card.id;
                    remove_card.innerHTML="Remove a card"
                    remove_card.style="margin-top: 10px; ";
                    remove_card.classList.add("buttonclass");
                    div_remove_card.appendChild(remove_card);

                    div_card_of_the_deck.appendChild(div_image);
                    div_card_of_the_deck.appendChild(div_remove_card);
                    my_deck.appendChild(div_card_of_the_deck);

                    specific_card_info.innerHTML = '';

                    remove_card.addEventListener("click", function(event){
                        if (elements!='B'){
                            let val = cards_in_the_deck.get(specific_card.id)-1;
                            cards_in_the_deck.set(specific_card.id, val)
                        }
                        data_statistics = rebuildData_delete(parseInt(specific_card.manaCost[1]));                       
                        new ManaCostStats().buildStats(document.getElementById("manaStats"),data_statistics);
                        
                        data_color = remove_color_statistics(specific_card.colorIdentity[0]);
                        new ColorStats().buildStats(document.getElementById("colorStats"), data_color);
                        
                        my_deck.removeChild(div_card_of_the_deck);
                        count_of_cards_in_the_deck--;
                        number_of_cards.innerHTML="Number of cards in deck: "+count_of_cards_in_the_deck;
                    })
                }
                else{
                    specific_card_info.innerHTML = 'You cannot add more than four copies of one card to the deck. This rule does not apply to "Earth"';

                }
            })

            //console.log("specific_card.imageUrl: ");
            //console.log(specific_card.imageUrl);
            //console.log("info_about_card: ");
            //console.log(specific_card.foreignNames[6].text);   
        })    
}

function rebuildData(manna){
    if(cost_count.has(manna)==true){  
        let val = cost_count.get(manna)+1;
        cost_count.set(manna, val);
    }
    else {
        cost_count.set(manna, 1);
    }
    //console.log(cost_count);
    let data = []
    for (let key of cost_count.keys()) {
        data.push({ cost: key, count: cost_count.get(key) })
    }
    return data;
}
function rebuildData_delete(manna){
    if(cost_count.get(manna)>1){  
        let val = cost_count.get(manna)-1;
        cost_count.set(manna, val);
    }
    else {
        cost_count.delete(manna);
    }
    //console.log(cost_count);
    let data = []
    for (let key of cost_count.keys()) {
        data.push({ cost: key, count: cost_count.get(key) })
    }
    return data;
}
function add_color_statistics(color_card){
    let value = color_count.get(color_card)+1;
    color_count.set(color_card, value);
    let data = []
    for (let key of color_count.keys()) {
        data.push({ color: key, count: color_count.get(key) })
    }
    return data;
}
function remove_color_statistics(color_card){
    let value = color_count.get(color_card)-1;
    color_count.set(color_card, value);
    let data = []
    for (let key of color_count.keys()) {
        data.push({ color: key, count: color_count.get(key) })
    }
    return data;
}