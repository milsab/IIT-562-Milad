$('document').ready(function(){
    $.getJSON("hand.json", function(hand){
        main(hand);
    });
});

function main(hand){
    
    var handRank = getRanks(hand);
    var handSuit = getSuits(hand);  

    var rankCounts = findNumOfElements(handRank);
    
    var counts = rankCounts.map(function(element){
        return element.count;
    });

    if(isRoyalFlush(handRank, counts, handSuit)){
        console.log('Royal Flush');
    } else if(isStraightFlush(handRank, counts, handSuit)){
        console.log('Straight Flush');
    } else if(isFourOfKind(counts)){
        console.log('Four of Kind');
    } else if (isFullHouse(counts)){
        console.log('Full House');
    } else if(isFlush(handSuit)){
        console.log('Flush');
    } else if(isStraight(handRank, counts)){
        console.log('Straight');
    } else if (isThreeOfKind(counts)){
        console.log('Three of Kind');
    } else if(isTwoPair(counts)){
        console.log('Two Pair');
    } else if(isPair(counts)){
        console.log('One Pair');
    } else {
        console.log('Bust');
    }

}

function getRanks(h){
    var handRank = h.map(function(card){
        return card.rank;
    });
    return handRank;
}

function getSuits(h){
    var handSuit = h.map(function(card){
        return card.suit;
    });
    return handSuit;
}

function containsElement(arr, ele){
    var result = false;
    arr.forEach(function(element) {
        if(element === ele){
            result = true;
        }
    }, this);
    return result;
}

function findNumOfElements(arr){
    
    var rankCounts = [];
    
    for(var i = 0; i < arr.length; i++){
        var count = 1;
        rankCount = {};
        for(var j = i + 1; j < arr.length; j++) {
            if(arr[i] === arr[j]){
                count++;
            }
        }
        rankCount.rank = arr[i];
        rankCount.count = count;
        var r = rankCounts.map(function(card){
            return card.rank;
        })
        if(!containsElement(r, rankCount.rank)){
            rankCounts.push(rankCount);
        }
    }
    return rankCounts;
}

function isPair(counts){
    var count = 0;
    counts.forEach(function(c){
        if(c === 2){
            count++;
        }
    });
    if (count === 1){
        return true;
    } else{
        return false;
    }
}

function isTwoPair(counts){
    var count = 0;
    counts.forEach(function(c){
        if(c === 2){
            count++;
        }
    });
    if (count === 2){
        return true;
    } else{
        return false;
    }
}

function isThreeOfKind(counts){
    var count = 0;
    counts.forEach(function(c){
        if(c === 3){
            count++;
        }
    });
    if (count === 1 && !isPair(counts)){
        return true;
    } else{
        return false;
    }
}

function isFullHouse(counts){
    var count = 0;
    counts.forEach(function(c){
        if(c === 3){
            count++;
        }
    });
    if (count === 1 && isPair(counts)){
        return true;
    } else{
        return false;
    }
}

function isFourOfKind(counts){
    var count = 0;
    counts.forEach(function(c){
        if(c === 4){
            count++;
        }
    });
    if (count === 1){
        return true;
    } else{
        return false;
    }
}

function isFlush(handSuit){
    var s = handSuit[0];
    var result = true;
    handSuit.forEach(function(suit){
        if(s !== suit){
            result = false;
        }
    })
    return result;
}

function isStraight(handRank, counts){
    var result = true;
    if(isFourOfKind(counts) || isFullHouse(counts) || isThreeOfKind(counts) || isTwoPair(counts) || isPair(counts)){
        result = false;
    } else {
        var max = Math.max(...handRank);
        var min = Math.min(...handRank);
        if(max - min !== 4){
            result = false;
        }
    }
    return result;
}

function isStraightFlush(handRank, counts, handSuit){
    if( isStraight(handRank, counts) && isFlush(handSuit)){
        return true;
    }
    return false;
}

function isRoyalFlush(handRank, counts, handSuit){
    if( isStraightFlush(handRank, counts, handSuit) ){
        var min = Math.min(...handRank);
        var max = Math.max(...handRank);
        if(min === 10 && max === 14){
            return true;
        }
    }
    return false;
}