import { Routes } from '@angular/router';
import { CalculatorComponent } from '@app/calculator/component';
import { ConverterComponent } from '@app/conversion/component';
import { AboutComponent } from '@app/about/component';

interface RouteData {
  title: string;
  subtitle?: string;
  isHome?: boolean;
}

export const routes: Routes = [
  {
    path: 'calc',
    component: CalculatorComponent,
    data: <RouteData>{ title: 'Calculators', isHome: true },
  },
  {
    path: 'calc/:settings',
    component: CalculatorComponent,
    data: <RouteData>{ title: 'Calculators', isHome: true },
  },
  {
    path: 'convert',
    component: ConverterComponent,
    data: <RouteData>{ title: 'Unit Converter', subtitle: 'Convert a Value From One Unit to Another' },
  },
  { path: 'about',
    component: AboutComponent,
    data: <RouteData>{ title: 'About', subtitle: 'Information About This Site' }
  },
  {
    path: '',
    redirectTo: 'calc',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'calc',
    pathMatch: 'full'
  }
];
