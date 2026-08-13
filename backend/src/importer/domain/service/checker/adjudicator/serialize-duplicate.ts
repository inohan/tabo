import {
  SerializedAdjudicatorDuplicationStatus,
  AdjudicatorDuplicationStatus,
} from '@importer/domain/values';
import { throwUnexpected_ } from 'src/lib/throw';
import { match } from 'ts-pattern';

export const serializeAdjudicatorDuplicationStatus = (
  duplicationStatus: AdjudicatorDuplicationStatus,
  indicesMapping: number[],
) =>
  match(duplicationStatus)
    .returnType<SerializedAdjudicatorDuplicationStatus>()
    .with({ hasDuplicate: true }, (duplicationStatus) => ({
      hasDuplicate: true,
      reasons: duplicationStatus.reasons.map((reason) =>
        match(reason)
          .with(
            { type: 'sameName' },
            (reason) =>
              `Other rows have the same name ${reason.name}: row(s) ${reason.indices.map((idx) => `${(indicesMapping[idx] ?? throwUnexpected_()) + 1}`).join(', ')}`,
          )
          .with(
            { type: 'sameMatch' },
            (reason) =>
              `Other rows have the same matching existing adjudicator ${reason.adjudicatorId}: row(s) ${reason.indices.map((idx) => `${(indicesMapping[idx] ?? throwUnexpected_()) + 1}`).join(', ')}`,
          )
          .exhaustive(),
      ),
    }))
    .with({ hasDuplicate: false }, () => ({ hasDuplicate: false }))
    .exhaustive();
