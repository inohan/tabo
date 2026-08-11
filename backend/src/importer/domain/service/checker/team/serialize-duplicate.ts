import {
  SerializedTeamDuplicationStatus,
  TeamDuplicationStatus,
} from '@importer/domain/values';
import { match } from 'ts-pattern';

export const serializeTeamDuplicationStatus = (
  duplicationStatus: TeamDuplicationStatus,
  indicesMapping: number[],
) =>
  match(duplicationStatus)
    .returnType<SerializedTeamDuplicationStatus>()
    .with({ hasDuplicate: true }, (duplicationStatus) => ({
      hasDuplicate: true,
      reasons: duplicationStatus.reasons.map((reason) =>
        match(reason)
          .with(
            { type: 'sameReference' },
            (reason) =>
              `Other rows have the same reference (team name) ${reason.reference}: row(s) ${reason.indices.map((idx) => `${indicesMapping[idx] + 1}`).join(', ')}`,
          )
          .with(
            { type: 'sameMatch' },
            (reason) =>
              `Other rows have the same matching existing team ${reason.teamId}: row(s) ${reason.indices.map((idx) => `${indicesMapping[idx] + 1}`).join(', ')}`,
          )
          .exhaustive(),
      ),
    }))
    .with({ hasDuplicate: false }, () => ({ hasDuplicate: false }))
    .exhaustive();
