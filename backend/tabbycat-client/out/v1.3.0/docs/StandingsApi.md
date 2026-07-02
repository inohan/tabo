# StandingsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TournamentsSpeakersStandingsList**](StandingsApi.md#apiv1tournamentsspeakersstandingslist) | **GET** /api/v1/tournaments/{tournament_slug}/speakers/standings | Get substantive speaker standings |
| [**apiV1TournamentsSpeakersStandingsRepliesList**](StandingsApi.md#apiv1tournamentsspeakersstandingsreplieslist) | **GET** /api/v1/tournaments/{tournament_slug}/speakers/standings/replies | Get reply speaker standings |
| [**apiV1TournamentsSpeakersStandingsRoundsList**](StandingsApi.md#apiv1tournamentsspeakersstandingsroundslist) | **GET** /api/v1/tournaments/{tournament_slug}/speakers/standings/rounds | Get speaker scores per round |
| [**apiV1TournamentsTeamsStandingsList**](StandingsApi.md#apiv1tournamentsteamsstandingslist) | **GET** /api/v1/tournaments/{tournament_slug}/teams/standings | Get team standings |
| [**apiV1TournamentsTeamsStandingsRoundsList**](StandingsApi.md#apiv1tournamentsteamsstandingsroundslist) | **GET** /api/v1/tournaments/{tournament_slug}/teams/standings/rounds | Get team scores per round |



## apiV1TournamentsSpeakersStandingsList

> Array&lt;SpeakerStandings&gt; apiV1TournamentsSpeakersStandingsList(tournamentSlug, category, extraMetrics, limit, metrics, offset, round)

Get substantive speaker standings

Get current standings

### Example

```ts
import {
  Configuration,
  StandingsApi,
} from '';
import type { ApiV1TournamentsSpeakersStandingsListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new StandingsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Only include participants in a category (ID) (optional)
    category: 56,
    // Array<'total' | 'average' | 'trimmed_mean' | 'team_points' | 'stdev' | 'count' | 'replies_sum' | 'replies_avg' | 'replies_stddev' | 'replies_count' | 'srank' | 'team_wins' | 'firsts' | 'seconds' | 'thirds' | 'num_adjs'> | Include these unranked metrics for participants; default is tournament settings (optional)
    extraMetrics: ...,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // Array<'total' | 'average' | 'trimmed_mean' | 'team_points' | 'stdev' | 'count' | 'replies_sum' | 'replies_avg' | 'replies_stddev' | 'replies_count' | 'srank' | 'team_wins' | 'firsts' | 'seconds' | 'thirds' | 'num_adjs'> | Rank participants with these metrics; default is tournament settings (optional)
    metrics: ...,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
    // number | Sequence of last round to take into account (optional)
    round: 56,
  } satisfies ApiV1TournamentsSpeakersStandingsListRequest;

  try {
    const data = await api.apiV1TournamentsSpeakersStandingsList(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **category** | `number` | Only include participants in a category (ID) | [Optional] [Defaults to `undefined`] |
| **extraMetrics** | `total`, `average`, `trimmed_mean`, `team_points`, `stdev`, `count`, `replies_sum`, `replies_avg`, `replies_stddev`, `replies_count`, `srank`, `team_wins`, `firsts`, `seconds`, `thirds`, `num_adjs` | Include these unranked metrics for participants; default is tournament settings | [Optional] [Enum: total, average, trimmed_mean, team_points, stdev, count, replies_sum, replies_avg, replies_stddev, replies_count, srank, team_wins, firsts, seconds, thirds, num_adjs] |
| **limit** | `number` | Number of results to return per page. | [Optional] [Defaults to `undefined`] |
| **metrics** | `total`, `average`, `trimmed_mean`, `team_points`, `stdev`, `count`, `replies_sum`, `replies_avg`, `replies_stddev`, `replies_count`, `srank`, `team_wins`, `firsts`, `seconds`, `thirds`, `num_adjs` | Rank participants with these metrics; default is tournament settings | [Optional] [Enum: total, average, trimmed_mean, team_points, stdev, count, replies_sum, replies_avg, replies_stddev, replies_count, srank, team_wins, firsts, seconds, thirds, num_adjs] |
| **offset** | `number` | The initial index from which to return the results. | [Optional] [Defaults to `undefined`] |
| **round** | `number` | Sequence of last round to take into account | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;SpeakerStandings&gt;**](SpeakerStandings.md)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsSpeakersStandingsRepliesList

> Array&lt;SpeakerStandings&gt; apiV1TournamentsSpeakersStandingsRepliesList(tournamentSlug, category, extraMetrics, limit, metrics, offset, round)

Get reply speaker standings

Get current standings

### Example

```ts
import {
  Configuration,
  StandingsApi,
} from '';
import type { ApiV1TournamentsSpeakersStandingsRepliesListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new StandingsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Only include participants in a category (ID) (optional)
    category: 56,
    // Array<'total' | 'average' | 'trimmed_mean' | 'team_points' | 'stdev' | 'count' | 'replies_sum' | 'replies_avg' | 'replies_stddev' | 'replies_count' | 'srank' | 'team_wins' | 'firsts' | 'seconds' | 'thirds' | 'num_adjs'> | Include these unranked metrics for participants; default is tournament settings (optional)
    extraMetrics: ...,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // Array<'total' | 'average' | 'trimmed_mean' | 'team_points' | 'stdev' | 'count' | 'replies_sum' | 'replies_avg' | 'replies_stddev' | 'replies_count' | 'srank' | 'team_wins' | 'firsts' | 'seconds' | 'thirds' | 'num_adjs'> | Rank participants with these metrics; default is tournament settings (optional)
    metrics: ...,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
    // number | Sequence of last round to take into account (optional)
    round: 56,
  } satisfies ApiV1TournamentsSpeakersStandingsRepliesListRequest;

  try {
    const data = await api.apiV1TournamentsSpeakersStandingsRepliesList(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **category** | `number` | Only include participants in a category (ID) | [Optional] [Defaults to `undefined`] |
| **extraMetrics** | `total`, `average`, `trimmed_mean`, `team_points`, `stdev`, `count`, `replies_sum`, `replies_avg`, `replies_stddev`, `replies_count`, `srank`, `team_wins`, `firsts`, `seconds`, `thirds`, `num_adjs` | Include these unranked metrics for participants; default is tournament settings | [Optional] [Enum: total, average, trimmed_mean, team_points, stdev, count, replies_sum, replies_avg, replies_stddev, replies_count, srank, team_wins, firsts, seconds, thirds, num_adjs] |
| **limit** | `number` | Number of results to return per page. | [Optional] [Defaults to `undefined`] |
| **metrics** | `total`, `average`, `trimmed_mean`, `team_points`, `stdev`, `count`, `replies_sum`, `replies_avg`, `replies_stddev`, `replies_count`, `srank`, `team_wins`, `firsts`, `seconds`, `thirds`, `num_adjs` | Rank participants with these metrics; default is tournament settings | [Optional] [Enum: total, average, trimmed_mean, team_points, stdev, count, replies_sum, replies_avg, replies_stddev, replies_count, srank, team_wins, firsts, seconds, thirds, num_adjs] |
| **offset** | `number` | The initial index from which to return the results. | [Optional] [Defaults to `undefined`] |
| **round** | `number` | Sequence of last round to take into account | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;SpeakerStandings&gt;**](SpeakerStandings.md)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsSpeakersStandingsRoundsList

> Array&lt;SpeakerRoundScores&gt; apiV1TournamentsSpeakersStandingsRoundsList(tournamentSlug, ghost, limit, offset, replies, substantive)

Get speaker scores per round

### Example

```ts
import {
  Configuration,
  StandingsApi,
} from '';
import type { ApiV1TournamentsSpeakersStandingsRoundsListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new StandingsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // boolean | Include ghost (iron-person) scores (optional)
    ghost: true,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
    // boolean | Whether to include reply speeches (optional)
    replies: true,
    // boolean | Whether to include substantive speeches (optional)
    substantive: true,
  } satisfies ApiV1TournamentsSpeakersStandingsRoundsListRequest;

  try {
    const data = await api.apiV1TournamentsSpeakersStandingsRoundsList(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **ghost** | `boolean` | Include ghost (iron-person) scores | [Optional] [Defaults to `false`] |
| **limit** | `number` | Number of results to return per page. | [Optional] [Defaults to `undefined`] |
| **offset** | `number` | The initial index from which to return the results. | [Optional] [Defaults to `undefined`] |
| **replies** | `boolean` | Whether to include reply speeches | [Optional] [Defaults to `false`] |
| **substantive** | `boolean` | Whether to include substantive speeches | [Optional] [Defaults to `true`] |

### Return type

[**Array&lt;SpeakerRoundScores&gt;**](SpeakerRoundScores.md)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsTeamsStandingsList

> Array&lt;TeamStandings&gt; apiV1TournamentsTeamsStandingsList(tournamentSlug, category, extraMetrics, limit, metrics, offset, round)

Get team standings

Get current standings

### Example

```ts
import {
  Configuration,
  StandingsApi,
} from '';
import type { ApiV1TournamentsTeamsStandingsListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new StandingsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Only include participants in a category (ID) (optional)
    category: 56,
    // Array<'points' | 'wins' | 'speaks_sum' | 'speaks_avg' | 'speaks_ind_avg' | 'speaks_stddev' | 'draw_strength' | 'draw_strength_speaks' | 'draw_strength_rank' | 'margin_sum' | 'margin_avg' | 'npullups' | 'pullup_debates' | 'num_adjs' | 'firsts' | 'seconds' | 'thirds' | 'num_iron' | 'wbw'> | Include these unranked metrics for participants; default is tournament settings (optional)
    extraMetrics: ...,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // Array<'points' | 'wins' | 'speaks_sum' | 'speaks_avg' | 'speaks_ind_avg' | 'speaks_stddev' | 'draw_strength' | 'draw_strength_speaks' | 'draw_strength_rank' | 'margin_sum' | 'margin_avg' | 'npullups' | 'pullup_debates' | 'num_adjs' | 'firsts' | 'seconds' | 'thirds' | 'num_iron' | 'wbw'> | Rank participants with these metrics; default is tournament settings (optional)
    metrics: ...,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
    // number | Sequence of last round to take into account (optional)
    round: 56,
  } satisfies ApiV1TournamentsTeamsStandingsListRequest;

  try {
    const data = await api.apiV1TournamentsTeamsStandingsList(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **category** | `number` | Only include participants in a category (ID) | [Optional] [Defaults to `undefined`] |
| **extraMetrics** | `points`, `wins`, `speaks_sum`, `speaks_avg`, `speaks_ind_avg`, `speaks_stddev`, `draw_strength`, `draw_strength_speaks`, `draw_strength_rank`, `margin_sum`, `margin_avg`, `npullups`, `pullup_debates`, `num_adjs`, `firsts`, `seconds`, `thirds`, `num_iron`, `wbw` | Include these unranked metrics for participants; default is tournament settings | [Optional] [Enum: points, wins, speaks_sum, speaks_avg, speaks_ind_avg, speaks_stddev, draw_strength, draw_strength_speaks, draw_strength_rank, margin_sum, margin_avg, npullups, pullup_debates, num_adjs, firsts, seconds, thirds, num_iron, wbw] |
| **limit** | `number` | Number of results to return per page. | [Optional] [Defaults to `undefined`] |
| **metrics** | `points`, `wins`, `speaks_sum`, `speaks_avg`, `speaks_ind_avg`, `speaks_stddev`, `draw_strength`, `draw_strength_speaks`, `draw_strength_rank`, `margin_sum`, `margin_avg`, `npullups`, `pullup_debates`, `num_adjs`, `firsts`, `seconds`, `thirds`, `num_iron`, `wbw` | Rank participants with these metrics; default is tournament settings | [Optional] [Enum: points, wins, speaks_sum, speaks_avg, speaks_ind_avg, speaks_stddev, draw_strength, draw_strength_speaks, draw_strength_rank, margin_sum, margin_avg, npullups, pullup_debates, num_adjs, firsts, seconds, thirds, num_iron, wbw] |
| **offset** | `number` | The initial index from which to return the results. | [Optional] [Defaults to `undefined`] |
| **round** | `number` | Sequence of last round to take into account | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;TeamStandings&gt;**](TeamStandings.md)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsTeamsStandingsRoundsList

> Array&lt;TeamRoundScores&gt; apiV1TournamentsTeamsStandingsRoundsList(tournamentSlug, limit, offset)

Get team scores per round

### Example

```ts
import {
  Configuration,
  StandingsApi,
} from '';
import type { ApiV1TournamentsTeamsStandingsRoundsListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new StandingsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
  } satisfies ApiV1TournamentsTeamsStandingsRoundsListRequest;

  try {
    const data = await api.apiV1TournamentsTeamsStandingsRoundsList(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **limit** | `number` | Number of results to return per page. | [Optional] [Defaults to `undefined`] |
| **offset** | `number` | The initial index from which to return the results. | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;TeamRoundScores&gt;**](TeamRoundScores.md)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

