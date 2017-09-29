import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { ICalculatorListItem } from './calculator-list-item';

@Injectable()
export class CalculatorListService {
  private _calculatorsUrl = './api/calculator/calculators.json';

  constructor(private _http: HttpClient) { }

  getCalculators(): Observable<ICalculatorListItem[]> {
    return this._http.get<ICalculatorListItem[]>(this._calculatorsUrl)
      // .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getCalculator(stub: string): Observable<ICalculatorListItem> {
    return this.getCalculators()
      .map((calculators: ICalculatorListItem[]) => calculators.find(c => c.stub === stub));
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }
}
