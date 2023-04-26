(()=>{
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createCard(index) {
        let cardItem = document.createElement('li');
        let card_flipper = document.createElement('div');
        let card_front = document.createElement('div');
        let card_back = document.createElement('div');

        cardItem.classList.add('flip-container');
        card_flipper.classList.add('flipper');
        card_front.classList.add('front');
        card_back.classList.add('back');

        card_back.textContent = index;

        card_flipper.append(card_front);
        card_flipper.append(card_back);
        cardItem.append(card_flipper);

        return {
            cardItem
        };
    }

    function createAllCards(value) {
        let cards = [];
        let cardsIndexes = [];

        for(let i = 0; i < value; i+=2) {
            cardsIndexes[i] = i / 2 + 1;
            cardsIndexes[i+1] = i / 2 + 1;
        }

        shuffle(cardsIndexes);

        for(let i = 0; i < cardsIndexes.length; i++) {
            cards[i] = createCard(cardsIndexes[i]);
        }

        return cards;
    }

    window.addEventListener('DOMContentLoaded', function(e) {
        const tab = document.querySelector('.start-tab');
        const tabButton = document.querySelector('.tab-button');
        const buttonReload = document.querySelector('.button-reload');
        let cardsList = document.querySelector('.cards-list');
        const input = document.querySelector('.tab-input');
        let cards;
        let buffer = [];
        let countPairs = 0;

        buttonReload.addEventListener('click', ()=>{
            location.reload();
        });

        tabButton.addEventListener('click', ()=>{
            if (input.value < 4 || input.value % 2 === 1 || input.value > 32) {
                alert('Введите четное число от 4 до 32!');
            }else {
                tab.classList.remove('start-tab--active');
                cards = createAllCards(input.value);
    
                if(cards) {
                    for(let i = 0; i < cards.length; i++) {
                        cardsList.append(cards[i].cardItem);
                        cards[i].cardItem.addEventListener('click', ()=>{
    
                            cards[i].cardItem.classList.toggle('flip');
                            cards[i].cardItem.style.pointerEvents='none';
                            if (buffer.length < 2) {
                                buffer.push(cards[i]);
                                console.log(buffer);
                            }
    
                            if (buffer.length === 2) {
                                cardsList.style.pointerEvents='none';
                                setTimeout((()=>{
                                    cardsList.style.pointerEvents='auto';
                                }), 1000);
                                if (buffer[0].cardItem.firstChild.lastChild.textContent === buffer[1].cardItem.firstChild.lastChild.textContent) {
                                    buffer[0].cardItem.style.pointerEvents='none';
                                    buffer[1].cardItem.style.pointerEvents='none';
                                    countPairs++;
                                    if(countPairs === (cards.length / 2)) {
                                        alert("Поздаравляю, Вы победили!");
                                    }
                                    buffer = [];
                                } 
                                else {
                                    buffer[0].cardItem.style.pointerEvents='none';
                                    buffer[1].cardItem.style.pointerEvents='none';
                                    setTimeout((()=>{
                                        buffer[0].cardItem.classList.remove('flip');
                                        buffer[1].cardItem.classList.remove('flip');
                                        buffer[0].cardItem.style.pointerEvents='auto';
                                        buffer[1].cardItem.style.pointerEvents='auto';
                                        buffer = [];
                                    }), 600);
                                }
                            }
                        })
                    }
                }
                
            }
            
        });
    });
})();
