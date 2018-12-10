import {
  transition,
  trigger,
  query,
  style,
  animate,
  state,
  group
} from '@angular/animations';


export const fadeAnimation =
  trigger('routeAnimation', [
    transition('HomePage <=> AllEvents', [
      query(':enter',
        [style({ opacity: 0 })],
        { optional: true }
      ),
      query(':leave',
        [style({ opacity: 1 }), animate('0.5s', style({ opacity: 0 }))],
        { optional: true }
      ),
      query(':enter',
        [style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 }))],
        { optional: true }
      )
    ])
  ]);

export const loadMoreAnimation =
trigger('loadMoreAnimation', [
  state('flyIn', style({ transform: 'translateX(0)' })),
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('300ms ease-in')
  ])
]);
