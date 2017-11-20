import { ICalcState } from '@app/calculator/state/ICalcState';

const INITIAL_STATE: ICalcState = {
  calcs: [],
  activeCalcs: [],
  inputs: [],
  activeInputs: [],
  loadingCalcs: false,
  error: null,
};

const initialState: IAppState = {
  courses: <Course[]>[],
  filteredCourses: <Course[]>[],
};

const filterCourses = (state, action): IAppState => Object.assign({}, state, {
  filteredCourses: state.courses.filter(c => c.name.toLowerCase().indexOf(action.searchText.toLowerCase()) > -1)
});

const storeCourses = (state, action): IAppState => Object.assign({}, state, {
  courses: action.courses,
  filteredCourses: action.courses,
});

export const calcReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_COURSES:
      return filterCourses(state, action);
    case REQUEST_COURSES_SUCCESS:
      return storeCourses(state, action);
    default:
      return state;
  }
}
