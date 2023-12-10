import { AppendOrRemove } from './enums';
import { AppendOrRemoveArgs } from './types';

export const extractAppendOrRemoveTarget = <T extends AppendOrRemoveArgs>(targets: T[]) => {
  const appends: number[] = [];
  const removes: number[] = [];

  for (const target of targets) {
    switch (target.action) {
      case AppendOrRemove.Append:
        appends.push(target.id);
        break;

      case AppendOrRemove.Remove:
        appends.push(target.id);
        break;
    }
  }

  return { appends, removes };
};
