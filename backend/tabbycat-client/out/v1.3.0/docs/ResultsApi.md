# ResultsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TournamentsRoundsPairingsBallotsCreate**](ResultsApi.md#apiv1tournamentsroundspairingsballotscreate) | **POST** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/pairings/{debate_pk}/ballots | Create ballot |
| [**apiV1TournamentsRoundsPairingsBallotsCreate2**](ResultsApi.md#apiv1tournamentsroundspairingsballotscreate2) | **POST** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/pairings/{debate_pk}/ballots/{id} | Update ballot |
| [**apiV1TournamentsRoundsPairingsBallotsDestroy**](ResultsApi.md#apiv1tournamentsroundspairingsballotsdestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/pairings/{debate_pk}/ballots/{id} | Delete ballot |
| [**apiV1TournamentsRoundsPairingsBallotsList**](ResultsApi.md#apiv1tournamentsroundspairingsballotslist) | **GET** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/pairings/{debate_pk}/ballots | Get debate ballots |
| [**apiV1TournamentsRoundsPairingsBallotsPartialUpdate**](ResultsApi.md#apiv1tournamentsroundspairingsballotspartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/pairings/{debate_pk}/ballots/{id} | Patch ballot |
| [**apiV1TournamentsRoundsPairingsBallotsRetrieve**](ResultsApi.md#apiv1tournamentsroundspairingsballotsretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/rounds/{round_seq}/pairings/{debate_pk}/ballots/{id} | Get ballot |



## apiV1TournamentsRoundsPairingsBallotsCreate

> Ballot apiV1TournamentsRoundsPairingsBallotsCreate(debatePk, roundSeq, tournamentSlug, ballot)

Create ballot

### Example

```ts
import {
  Configuration,
  ResultsApi,
} from '';
import type { ApiV1TournamentsRoundsPairingsBallotsCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ResultsApi(config);

  const body = {
    // number | The debate\'s primary key
    debatePk: 56,
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Ballot
    ballot: ...,
  } satisfies ApiV1TournamentsRoundsPairingsBallotsCreateRequest;

  try {
    const data = await api.apiV1TournamentsRoundsPairingsBallotsCreate(body);
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
| **debatePk** | `number` | The debate\&#39;s primary key | [Defaults to `undefined`] |
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **ballot** | [Ballot](Ballot.md) |  | |

### Return type

[**Ballot**](Ballot.md)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsRoundsPairingsBallotsCreate2

> Ballot apiV1TournamentsRoundsPairingsBallotsCreate2(debatePk, id, roundSeq, tournamentSlug, updateBallot)

Update ballot

### Example

```ts
import {
  Configuration,
  ResultsApi,
} from '';
import type { ApiV1TournamentsRoundsPairingsBallotsCreate2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ResultsApi(config);

  const body = {
    // number | The debate\'s primary key
    debatePk: 56,
    // number | The object\'s primary key
    id: 56,
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // UpdateBallot (optional)
    updateBallot: ...,
  } satisfies ApiV1TournamentsRoundsPairingsBallotsCreate2Request;

  try {
    const data = await api.apiV1TournamentsRoundsPairingsBallotsCreate2(body);
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
| **debatePk** | `number` | The debate\&#39;s primary key | [Defaults to `undefined`] |
| **id** | `number` | The object\&#39;s primary key | [Defaults to `undefined`] |
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **updateBallot** | [UpdateBallot](UpdateBallot.md) |  | [Optional] |

### Return type

[**Ballot**](Ballot.md)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsRoundsPairingsBallotsDestroy

> Ballot apiV1TournamentsRoundsPairingsBallotsDestroy(debatePk, id, roundSeq, tournamentSlug)

Delete ballot

Only mark as discarded; don\&#39;t allow object deletion.

### Example

```ts
import {
  Configuration,
  ResultsApi,
} from '';
import type { ApiV1TournamentsRoundsPairingsBallotsDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ResultsApi(config);

  const body = {
    // number | The debate\'s primary key
    debatePk: 56,
    // number | The object\'s primary key
    id: 56,
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsRoundsPairingsBallotsDestroyRequest;

  try {
    const data = await api.apiV1TournamentsRoundsPairingsBallotsDestroy(body);
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
| **debatePk** | `number` | The debate\&#39;s primary key | [Defaults to `undefined`] |
| **id** | `number` | The object\&#39;s primary key | [Defaults to `undefined`] |
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |

### Return type

[**Ballot**](Ballot.md)

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


## apiV1TournamentsRoundsPairingsBallotsList

> Array&lt;Ballot&gt; apiV1TournamentsRoundsPairingsBallotsList(debatePk, roundSeq, tournamentSlug, confirmed, limit, offset)

Get debate ballots

### Example

```ts
import {
  Configuration,
  ResultsApi,
} from '';
import type { ApiV1TournamentsRoundsPairingsBallotsListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ResultsApi(config);

  const body = {
    // number | The debate\'s primary key
    debatePk: 56,
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // boolean | Only include confirmed ballots (optional)
    confirmed: true,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
  } satisfies ApiV1TournamentsRoundsPairingsBallotsListRequest;

  try {
    const data = await api.apiV1TournamentsRoundsPairingsBallotsList(body);
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
| **debatePk** | `number` | The debate\&#39;s primary key | [Defaults to `undefined`] |
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **confirmed** | `boolean` | Only include confirmed ballots | [Optional] [Defaults to `false`] |
| **limit** | `number` | Number of results to return per page. | [Optional] [Defaults to `undefined`] |
| **offset** | `number` | The initial index from which to return the results. | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Ballot&gt;**](Ballot.md)

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


## apiV1TournamentsRoundsPairingsBallotsPartialUpdate

> Ballot apiV1TournamentsRoundsPairingsBallotsPartialUpdate(debatePk, id, roundSeq, tournamentSlug, patchedUpdateBallot)

Patch ballot

### Example

```ts
import {
  Configuration,
  ResultsApi,
} from '';
import type { ApiV1TournamentsRoundsPairingsBallotsPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ResultsApi(config);

  const body = {
    // number | The debate\'s primary key
    debatePk: 56,
    // number | The object\'s primary key
    id: 56,
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedUpdateBallot (optional)
    patchedUpdateBallot: ...,
  } satisfies ApiV1TournamentsRoundsPairingsBallotsPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsRoundsPairingsBallotsPartialUpdate(body);
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
| **debatePk** | `number` | The debate\&#39;s primary key | [Defaults to `undefined`] |
| **id** | `number` | The object\&#39;s primary key | [Defaults to `undefined`] |
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **patchedUpdateBallot** | [PatchedUpdateBallot](PatchedUpdateBallot.md) |  | [Optional] |

### Return type

[**Ballot**](Ballot.md)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsRoundsPairingsBallotsRetrieve

> Ballot apiV1TournamentsRoundsPairingsBallotsRetrieve(debatePk, id, roundSeq, tournamentSlug)

Get ballot

### Example

```ts
import {
  Configuration,
  ResultsApi,
} from '';
import type { ApiV1TournamentsRoundsPairingsBallotsRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ResultsApi(config);

  const body = {
    // number | The debate\'s primary key
    debatePk: 56,
    // number | The object\'s primary key
    id: 56,
    // number | The round\'s sequence number
    roundSeq: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsRoundsPairingsBallotsRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsRoundsPairingsBallotsRetrieve(body);
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
| **debatePk** | `number` | The debate\&#39;s primary key | [Defaults to `undefined`] |
| **id** | `number` | The object\&#39;s primary key | [Defaults to `undefined`] |
| **roundSeq** | `number` | The round\&#39;s sequence number | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |

### Return type

[**Ballot**](Ballot.md)

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

