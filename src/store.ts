import {map, of, Subject} from 'rxjs';

export const store$ = of(['1','2','3']).pipe(map((x) => x ))
