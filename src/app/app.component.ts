import { Component, OnInit } from '@angular/core';
import { StarWarsService } from './star-wars.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  objectKeys = Object.keys;

  countEntity = {
    people: '-',
    planets: '-',
    starships: '-'
  };

  info = {
    people: [],
    planets: [],
    starships: []
  };


  NUM_OF_CARDS = 12;

  constructor(private starWarsService: StarWarsService) { }

  getInfo(element, page) {
    if (element == 'people') {
      this.starWarsService.getInfo(element, page).then(
        info => {
          this.countEntity[element] = info.count;
          info.results.forEach(element => {
            element.isOpen = "false";
            this.info.people.push(element);

          })
        });
    }
    else if (element == 'planets') {
      this.starWarsService.getInfo(element, page).then(info => {
        this.countEntity[element] = info.count;
        info.results.forEach(element => {
          element.isOpen = "false";
          this.info.planets.push(element);


        })
      });
    }
    else {
      this.starWarsService.getInfo(element, page).then(info => {
        this.countEntity[element] = info.count;
        info.results.forEach(element => {
          element.isOpen = "false";
          this.info.starships.push(element);

        })
      });
    }
  }

  getDataInfo(urlItem, index, entity, x) {
    this.starWarsService.getUrlData(urlItem).then(info => {
      if (info.name) {
        this.info[entity][index][x] = info.name
      }
      else {
        this.info[entity][index][x] = info.title;
      }
    });
  }

  getDataInfoArr(urlItem, index, entity, x, indexOfArr) {
    this.starWarsService.getUrlData(urlItem).then(info => {
      if (info.name) {
        this.info[entity][index][x][indexOfArr] = info.name;
      }
      else {
        this.info[entity][index][x][indexOfArr] = info.title;
      }
    });
  }





  ngOnInit(): void {
    let i = 0;
    while (i * 10 < this.NUM_OF_CARDS) {
      i++;
      this.getInfo('planets', i);
      this.getInfo('people', i);
      this.getInfo('starships', i);
    }




  }

  toggleCard(card, index, entity) {
    /*problem je PIPE jer pravi novo polje i u njemu sprema key i value...MOZDA*/
    if (card.isOpen == "false") {
      this.closeCards();
      for (let x in card) {
        if (x != 'url' && this.urlChecker(card[x])) {
          if (typeof card[x] == 'string') {
            this.getDataInfo(card[x], index, entity, x);
          }
          else {
            for (let i = 0; i < card[x].length; i++) {
              this.getDataInfoArr(card[x][i], index, entity, x, i);
            }
          }
        }
      }
      card.isOpen = "true";

    }
    else {

      card.isOpen = "false";

    }
  }

  closeCards() {
    this.info.people.forEach(element => {
      element.isOpen = "false";
    });
    this.info.planets.forEach(element => {
      element.isOpen = "false";
    });
    this.info.starships.forEach(element => {
      element.isOpen = "false";
    });
  }

  capitalizeFirstLetter(string) {
    return (string.charAt(0).toUpperCase() + string.slice(1)).replace(/_/g, " ");
  }

  urlChecker(element) {
    if (typeof element == 'string' && element.search('http') > -1) {
      return true;
    }
    else if (typeof element == 'object') {
      for (let i = 0; i < element.length; i++) {
        if (element[i].search('https') > -1) {
          return true;
        }
      }
    }
    else {
      return false;
    }
  }

  checkIsArr(urlArr) {
    return typeof urlArr == 'object';
  }

  f2(event) {
    let cardClass=event.target.className;
   
    if(event.target.parentNode.className!=='is-opened' && event.target.parentNode.className!=='flex-item' && cardClass.search("fa fa-4x")<0 && event.target.tagName!=='TD'){
       this.closeCards(); 
    }
  }

}
