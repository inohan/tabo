# QuestionsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TournamentsQuestionsCreate**](QuestionsApi.md#apiv1tournamentsquestionscreate) | **POST** /api/v1/tournaments/{tournament_slug}/questions | Create question |
| [**apiV1TournamentsQuestionsCreate2**](QuestionsApi.md#apiv1tournamentsquestionscreate2) | **POST** /api/v1/tournaments/{tournament_slug}/questions/{id} | Update question |
| [**apiV1TournamentsQuestionsDestroy**](QuestionsApi.md#apiv1tournamentsquestionsdestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/questions/{id} | Delete question |
| [**apiV1TournamentsQuestionsList**](QuestionsApi.md#apiv1tournamentsquestionslist) | **GET** /api/v1/tournaments/{tournament_slug}/questions | List tournament questions |
| [**apiV1TournamentsQuestionsPartialUpdate**](QuestionsApi.md#apiv1tournamentsquestionspartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/questions/{id} | Patch question |
| [**apiV1TournamentsQuestionsRetrieve**](QuestionsApi.md#apiv1tournamentsquestionsretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/questions/{id} | Get question |



## apiV1TournamentsQuestionsCreate

> Question apiV1TournamentsQuestionsCreate(tournamentSlug, question)

Create question

### Example

```ts
import {
  Configuration,
  QuestionsApi,
} from '';
import type { ApiV1TournamentsQuestionsCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new QuestionsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Question
    question: ...,
  } satisfies ApiV1TournamentsQuestionsCreateRequest;

  try {
    const data = await api.apiV1TournamentsQuestionsCreate(body);
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
| **question** | [Question](Question.md) |  | |

### Return type

[**Question**](Question.md)

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


## apiV1TournamentsQuestionsCreate2

> Question apiV1TournamentsQuestionsCreate2(id, tournamentSlug, question)

Update question

### Example

```ts
import {
  Configuration,
  QuestionsApi,
} from '';
import type { ApiV1TournamentsQuestionsCreate2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new QuestionsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Question
    question: ...,
  } satisfies ApiV1TournamentsQuestionsCreate2Request;

  try {
    const data = await api.apiV1TournamentsQuestionsCreate2(body);
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
| **question** | [Question](Question.md) |  | |

### Return type

[**Question**](Question.md)

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


## apiV1TournamentsQuestionsDestroy

> apiV1TournamentsQuestionsDestroy(id, tournamentSlug)

Delete question

### Example

```ts
import {
  Configuration,
  QuestionsApi,
} from '';
import type { ApiV1TournamentsQuestionsDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new QuestionsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsQuestionsDestroyRequest;

  try {
    const data = await api.apiV1TournamentsQuestionsDestroy(body);
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


## apiV1TournamentsQuestionsList

> Array&lt;Question&gt; apiV1TournamentsQuestionsList(tournamentSlug, limit, offset)

List tournament questions

### Example

```ts
import {
  Configuration,
  QuestionsApi,
} from '';
import type { ApiV1TournamentsQuestionsListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new QuestionsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
  } satisfies ApiV1TournamentsQuestionsListRequest;

  try {
    const data = await api.apiV1TournamentsQuestionsList(body);
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

[**Array&lt;Question&gt;**](Question.md)

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


## apiV1TournamentsQuestionsPartialUpdate

> Question apiV1TournamentsQuestionsPartialUpdate(id, tournamentSlug, patchedQuestion)

Patch question

### Example

```ts
import {
  Configuration,
  QuestionsApi,
} from '';
import type { ApiV1TournamentsQuestionsPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new QuestionsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedQuestion (optional)
    patchedQuestion: ...,
  } satisfies ApiV1TournamentsQuestionsPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsQuestionsPartialUpdate(body);
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
| **patchedQuestion** | [PatchedQuestion](PatchedQuestion.md) |  | [Optional] |

### Return type

[**Question**](Question.md)

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


## apiV1TournamentsQuestionsRetrieve

> Question apiV1TournamentsQuestionsRetrieve(id, tournamentSlug)

Get question

### Example

```ts
import {
  Configuration,
  QuestionsApi,
} from '';
import type { ApiV1TournamentsQuestionsRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new QuestionsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsQuestionsRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsQuestionsRetrieve(body);
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

[**Question**](Question.md)

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

