import { SetMetadata } from '@nestjs/common';

import { MetadataKey } from '../constants';

export const SetIgnoreException = () => SetMetadata(MetadataKey.SetIgnoreException, true);
