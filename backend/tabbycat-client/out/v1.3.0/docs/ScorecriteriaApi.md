# ScorecriteriaApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TournamentsScoreCriteriaCreate**](ScorecriteriaApi.md#apiv1tournamentsscorecriteriacreate) | **POST** /api/v1/tournaments/{tournament_slug}/score-criteria | Create score criterion |
| [**apiV1TournamentsScoreCriteriaCreate2**](ScorecriteriaApi.md#apiv1tournamentsscorecriteriacreate2) | **POST** /api/v1/tournaments/{tournament_slug}/score-criteria/{id} | Update score criterion |
| [**apiV1TournamentsScoreCriteriaDestroy**](ScorecriteriaApi.md#apiv1tournamentsscorecriteriadestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/score-criteria/{id} | Delete score criterion |
| [**apiV1TournamentsScoreCriteriaList**](ScorecriteriaApi.md#apiv1tournamentsscorecriterialist) | **GET** /api/v1/tournaments/{tournament_slug}/score-criteria | List all score criteria in tournament |
| [**apiV1TournamentsScoreCriteriaPartialUpdate**](ScorecriteriaApi.md#apiv1tournamentsscorecriteriapartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/score-criteria/{id} | Patch score criterion |
| [**apiV1TournamentsScoreCriteriaRetrieve**](ScorecriteriaApi.md#apiv1tournamentsscorecriteriaretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/score-criteria/{id} | Get score criterion |



## apiV1TournamentsScoreCriteriaCreate

> ScoreCriterion apiV1TournamentsScoreCriteriaCreate(tournamentSlug, scoreCriterion)

Create score criterion

### Example

```ts
import {
  Configuration,
  ScorecriteriaApi,
} from '';
import type { ApiV1TournamentsScoreCriteriaCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ScorecriteriaApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // ScoreCriterion
    scoreCriterion: ...,
  } satisfies ApiV1TournamentsScoreCriteriaCreateRequest;

  try {
    const data = await api.apiV1TournamentsScoreCriteriaCreate(body);
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
| **scoreCriterion** | [ScoreCriterion](ScoreCriterion.md) |  | |

### Return type

[**ScoreCriterion**](ScoreCriterion.md)

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


## apiV1TournamentsScoreCriteriaCreate2

> ScoreCriterion apiV1TournamentsScoreCriteriaCreate2(id, tournamentSlug, scoreCriterion)

Update score criterion

### Example

```ts
import {
  Configuration,
  ScorecriteriaApi,
} from '';
import type { ApiV1TournamentsScoreCriteriaCreate2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ScorecriteriaApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // ScoreCriterion
    scoreCriterion: ...,
  } satisfies ApiV1TournamentsScoreCriteriaCreate2Request;

  try {
    const data = await api.apiV1TournamentsScoreCriteriaCreate2(body);
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
| **id** | `number` | The object\&#39;s primary key | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **scoreCriterion** | [ScoreCriterion](ScoreCriterion.md) |  | |

### Return type

[**ScoreCriterion**](ScoreCriterion.md)

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


## apiV1TournamentsScoreCriteriaDestroy

> apiV1TournamentsScoreCriteriaDestroy(id, tournamentSlug)

Delete score criterion

### Example

```ts
import {
  Configuration,
  ScorecriteriaApi,
} from '';
import type { ApiV1TournamentsScoreCriteriaDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ScorecriteriaApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsScoreCriteriaDestroyRequest;

  try {
    const data = await api.apiV1TournamentsScoreCriteriaDestroy(body);
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
| **id** | `number` | The object\&#39;s primary key | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No response body |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TournamentsScoreCriteriaList

> Array&lt;ScoreCriterion&gt; apiV1TournamentsScoreCriteriaList(tournamentSlug, limit, offset)

List all score criteria in tournament

### Example

```ts
import {
  Configuration,
  ScorecriteriaApi,
} from '';
import type { ApiV1TournamentsScoreCriteriaListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ScorecriteriaApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
  } satisfies ApiV1TournamentsScoreCriteriaListRequest;

  try {
    const data = await api.apiV1TournamentsScoreCriteriaList(body);
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

[**Array&lt;ScoreCriterion&gt;**](ScoreCriterion.md)

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


## apiV1TournamentsScoreCriteriaPartialUpdate

> ScoreCriterion apiV1TournamentsScoreCriteriaPartialUpdate(id, tournamentSlug, patchedScoreCriterion)

Patch score criterion

### Example

```ts
import {
  Configuration,
  ScorecriteriaApi,
} from '';
import type { ApiV1TournamentsScoreCriteriaPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ScorecriteriaApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedScoreCriterion (optional)
    patchedScoreCriterion: ...,
  } satisfies ApiV1TournamentsScoreCriteriaPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsScoreCriteriaPartialUpdate(body);
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
| **id** | `number` | The object\&#39;s primary key | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |
| **patchedScoreCriterion** | [PatchedScoreCriterion](PatchedScoreCriterion.md) |  | [Optional] |

### Return type

[**ScoreCriterion**](ScoreCriterion.md)

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


## apiV1TournamentsScoreCriteriaRetrieve

> ScoreCriterion apiV1TournamentsScoreCriteriaRetrieve(id, tournamentSlug)

Get score criterion

### Example

```ts
import {
  Configuration,
  ScorecriteriaApi,
} from '';
import type { ApiV1TournamentsScoreCriteriaRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ScorecriteriaApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsScoreCriteriaRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsScoreCriteriaRetrieve(body);
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
| **id** | `number` | The object\&#39;s primary key | [Defaults to `undefined`] |
| **tournamentSlug** | `string` | The tournament\&#39;s slug | [Defaults to `undefined`] |

### Return type

[**ScoreCriterion**](ScoreCriterion.md)

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

