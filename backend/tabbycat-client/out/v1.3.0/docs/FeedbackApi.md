# FeedbackApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TournamentsFeedbackCreate**](FeedbackApi.md#apiv1tournamentsfeedbackcreate) | **POST** /api/v1/tournaments/{tournament_slug}/feedback | Create feedback |
| [**apiV1TournamentsFeedbackCreate2**](FeedbackApi.md#apiv1tournamentsfeedbackcreate2) | **POST** /api/v1/tournaments/{tournament_slug}/feedback/{id} | Update feedback |
| [**apiV1TournamentsFeedbackDestroy**](FeedbackApi.md#apiv1tournamentsfeedbackdestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/feedback/{id} | Delete feedback |
| [**apiV1TournamentsFeedbackList**](FeedbackApi.md#apiv1tournamentsfeedbacklist) | **GET** /api/v1/tournaments/{tournament_slug}/feedback | List all tournament feedback |
| [**apiV1TournamentsFeedbackPartialUpdate**](FeedbackApi.md#apiv1tournamentsfeedbackpartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/feedback/{id} | Patch feedback |
| [**apiV1TournamentsFeedbackQuestionsCreate**](FeedbackApi.md#apiv1tournamentsfeedbackquestionscreate) | **POST** /api/v1/tournaments/{tournament_slug}/feedback-questions | Create feedback question |
| [**apiV1TournamentsFeedbackQuestionsCreate2**](FeedbackApi.md#apiv1tournamentsfeedbackquestionscreate2) | **POST** /api/v1/tournaments/{tournament_slug}/feedback-questions/{id} | Update feedback question |
| [**apiV1TournamentsFeedbackQuestionsDestroy**](FeedbackApi.md#apiv1tournamentsfeedbackquestionsdestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/feedback-questions/{id} | Delete feedback question |
| [**apiV1TournamentsFeedbackQuestionsList**](FeedbackApi.md#apiv1tournamentsfeedbackquestionslist) | **GET** /api/v1/tournaments/{tournament_slug}/feedback-questions | List tournament feedback questions |
| [**apiV1TournamentsFeedbackQuestionsPartialUpdate**](FeedbackApi.md#apiv1tournamentsfeedbackquestionspartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/feedback-questions/{id} | Patch feedback question |
| [**apiV1TournamentsFeedbackQuestionsRetrieve**](FeedbackApi.md#apiv1tournamentsfeedbackquestionsretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/feedback-questions/{id} | Get feedback question |
| [**apiV1TournamentsFeedbackRetrieve**](FeedbackApi.md#apiv1tournamentsfeedbackretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/feedback/{id} | Get feedback |



## apiV1TournamentsFeedbackCreate

> Feedback apiV1TournamentsFeedbackCreate(tournamentSlug, feedback)

Create feedback

### Example

```ts
import {
  Configuration,
  FeedbackApi,
} from '';
import type { ApiV1TournamentsFeedbackCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FeedbackApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Feedback
    feedback: ...,
  } satisfies ApiV1TournamentsFeedbackCreateRequest;

  try {
    const data = await api.apiV1TournamentsFeedbackCreate(body);
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
| **feedback** | [Feedback](Feedback.md) |  | |

### Return type

[**Feedback**](Feedback.md)

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


## apiV1TournamentsFeedbackCreate2

> Feedback apiV1TournamentsFeedbackCreate2(id, tournamentSlug, feedback)

Update feedback

### Example

```ts
import {
  Configuration,
  FeedbackApi,
} from '';
import type { ApiV1TournamentsFeedbackCreate2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FeedbackApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Feedback
    feedback: ...,
  } satisfies ApiV1TournamentsFeedbackCreate2Request;

  try {
    const data = await api.apiV1TournamentsFeedbackCreate2(body);
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
| **feedback** | [Feedback](Feedback.md) |  | |

### Return type

[**Feedback**](Feedback.md)

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


## apiV1TournamentsFeedbackDestroy

> apiV1TournamentsFeedbackDestroy(id, tournamentSlug)

Delete feedback

### Example

```ts
import {
  Configuration,
  FeedbackApi,
} from '';
import type { ApiV1TournamentsFeedbackDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FeedbackApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsFeedbackDestroyRequest;

  try {
    const data = await api.apiV1TournamentsFeedbackDestroy(body);
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


## apiV1TournamentsFeedbackList

> Array&lt;Feedback&gt; apiV1TournamentsFeedbackList(tournamentSlug, limit, offset, round, source, sourceType, target)

List all tournament feedback

### Example

```ts
import {
  Configuration,
  FeedbackApi,
} from '';
import type { ApiV1TournamentsFeedbackListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FeedbackApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
    // Array<number> | The sequence of the rounds of the submitted feedback (optional)
    round: ...,
    // number | The ID of the participant submitting feedback; must be used in conjunction with `source_type` (optional)
    source: 56,
    // 'adjudicator' | 'team' | The type of participant submitter of the feedback (optional)
    sourceType: sourceType_example,
    // number | The ID of the adjudicator receiving feedback (optional)
    target: 56,
  } satisfies ApiV1TournamentsFeedbackListRequest;

  try {
    const data = await api.apiV1TournamentsFeedbackList(body);
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
| **round** | `Array<number>` | The sequence of the rounds of the submitted feedback | [Optional] |
| **source** | `number` | The ID of the participant submitting feedback; must be used in conjunction with &#x60;source_type&#x60; | [Optional] [Defaults to `undefined`] |
| **sourceType** | `adjudicator`, `team` | The type of participant submitter of the feedback | [Optional] [Defaults to `undefined`] [Enum: adjudicator, team] |
| **target** | `number` | The ID of the adjudicator receiving feedback | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Feedback&gt;**](Feedback.md)

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


## apiV1TournamentsFeedbackPartialUpdate

> Feedback apiV1TournamentsFeedbackPartialUpdate(id, tournamentSlug, patchedFeedback)

Patch feedback

### Example

```ts
import {
  Configuration,
  FeedbackApi,
} from '';
import type { ApiV1TournamentsFeedbackPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FeedbackApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedFeedback (optional)
    patchedFeedback: ...,
  } satisfies ApiV1TournamentsFeedbackPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsFeedbackPartialUpdate(body);
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
| **patchedFeedback** | [PatchedFeedback](PatchedFeedback.md) |  | [Optional] |

### Return type

[**Feedback**](Feedback.md)

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


## apiV1TournamentsFeedbackQuestionsCreate

> FeedbackQuestion apiV1TournamentsFeedbackQuestionsCreate(tournamentSlug, feedbackQuestion)

Create feedback question

### Example

```ts
import {
  Configuration,
  FeedbackApi,
} from '';
import type { ApiV1TournamentsFeedbackQuestionsCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FeedbackApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // FeedbackQuestion
    feedbackQuestion: ...,
  } satisfies ApiV1TournamentsFeedbackQuestionsCreateRequest;

  try {
    const data = await api.apiV1TournamentsFeedbackQuestionsCreate(body);
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
| **feedbackQuestion** | [FeedbackQuestion](FeedbackQuestion.md) |  | |

### Return type

[**FeedbackQuestion**](FeedbackQuestion.md)

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


## apiV1TournamentsFeedbackQuestionsCreate2

> FeedbackQuestion apiV1TournamentsFeedbackQuestionsCreate2(id, tournamentSlug, feedbackQuestion)

Update feedback question

### Example

```ts
import {
  Configuration,
  FeedbackApi,
} from '';
import type { ApiV1TournamentsFeedbackQuestionsCreate2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FeedbackApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // FeedbackQuestion
    feedbackQuestion: ...,
  } satisfies ApiV1TournamentsFeedbackQuestionsCreate2Request;

  try {
    const data = await api.apiV1TournamentsFeedbackQuestionsCreate2(body);
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
| **feedbackQuestion** | [FeedbackQuestion](FeedbackQuestion.md) |  | |

### Return type

[**FeedbackQuestion**](FeedbackQuestion.md)

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


## apiV1TournamentsFeedbackQuestionsDestroy

> apiV1TournamentsFeedbackQuestionsDestroy(id, tournamentSlug)

Delete feedback question

### Example

```ts
import {
  Configuration,
  FeedbackApi,
} from '';
import type { ApiV1TournamentsFeedbackQuestionsDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FeedbackApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsFeedbackQuestionsDestroyRequest;

  try {
    const data = await api.apiV1TournamentsFeedbackQuestionsDestroy(body);
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


## apiV1TournamentsFeedbackQuestionsList

> Array&lt;FeedbackQuestion&gt; apiV1TournamentsFeedbackQuestionsList(tournamentSlug, fromAdj, fromTeam, limit, offset)

List tournament feedback questions

### Example

```ts
import {
  Configuration,
  FeedbackApi,
} from '';
import type { ApiV1TournamentsFeedbackQuestionsListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FeedbackApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // boolean | Only include questions given to adjudicators (optional)
    fromAdj: true,
    // boolean | Only include questions given to teams (optional)
    fromTeam: true,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
  } satisfies ApiV1TournamentsFeedbackQuestionsListRequest;

  try {
    const data = await api.apiV1TournamentsFeedbackQuestionsList(body);
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
| **fromAdj** | `boolean` | Only include questions given to adjudicators | [Optional] [Defaults to `false`] |
| **fromTeam** | `boolean` | Only include questions given to teams | [Optional] [Defaults to `false`] |
| **limit** | `number` | Number of results to return per page. | [Optional] [Defaults to `undefined`] |
| **offset** | `number` | The initial index from which to return the results. | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;FeedbackQuestion&gt;**](FeedbackQuestion.md)

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


## apiV1TournamentsFeedbackQuestionsPartialUpdate

> FeedbackQuestion apiV1TournamentsFeedbackQuestionsPartialUpdate(id, tournamentSlug, patchedFeedbackQuestion)

Patch feedback question

### Example

```ts
import {
  Configuration,
  FeedbackApi,
} from '';
import type { ApiV1TournamentsFeedbackQuestionsPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FeedbackApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedFeedbackQuestion (optional)
    patchedFeedbackQuestion: ...,
  } satisfies ApiV1TournamentsFeedbackQuestionsPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsFeedbackQuestionsPartialUpdate(body);
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
| **patchedFeedbackQuestion** | [PatchedFeedbackQuestion](PatchedFeedbackQuestion.md) |  | [Optional] |

### Return type

[**FeedbackQuestion**](FeedbackQuestion.md)

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


## apiV1TournamentsFeedbackQuestionsRetrieve

> FeedbackQuestion apiV1TournamentsFeedbackQuestionsRetrieve(id, tournamentSlug)

Get feedback question

### Example

```ts
import {
  Configuration,
  FeedbackApi,
} from '';
import type { ApiV1TournamentsFeedbackQuestionsRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FeedbackApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsFeedbackQuestionsRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsFeedbackQuestionsRetrieve(body);
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

[**FeedbackQuestion**](FeedbackQuestion.md)

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


## apiV1TournamentsFeedbackRetrieve

> Feedback apiV1TournamentsFeedbackRetrieve(id, tournamentSlug)

Get feedback

### Example

```ts
import {
  Configuration,
  FeedbackApi,
} from '';
import type { ApiV1TournamentsFeedbackRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FeedbackApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsFeedbackRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsFeedbackRetrieve(body);
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

[**Feedback**](Feedback.md)

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

