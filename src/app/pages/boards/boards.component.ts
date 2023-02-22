import { Component } from '@angular/core';
import {
  faClock,
  faDashboard,
  faBox,
  faWaveSquare,
  faAngleUp,
  faAngleDown,
  faHeart,
  faGear,
  faBorderAll,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
})
export class BoardsComponent {
  faClock = faClock;
  faDashboard = faDashboard;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faTrello = faTrello;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faHeart = faHeart;
  faGear = faGear;
  faBorderAll = faBorderAll;
  faUsers = faUsers;

  items = [
    {
      label: 'Item 1',
      items: [
        { label: 'Item 1.1' },
        { label: 'Item 1.2' },
        { label: 'Item 1.3' },
        { label: 'Item 1.4' },
      ],
    },
    {
      label: 'Item 2',
      items: [{ label: 'Item 2.1' }, { label: 'Item 2.2' }],
    },
    {
      label: 'Item 3',
      items: [
        { label: 'Item 3.1' },
        { label: 'Item 3.2' },
        { label: 'Item 3.3' },
      ],
    },
  ];
}
