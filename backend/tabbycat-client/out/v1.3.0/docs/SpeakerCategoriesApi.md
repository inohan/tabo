# SpeakerCategoriesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TournamentsSpeakerCategoriesCreate**](SpeakerCategoriesApi.md#apiv1tournamentsspeakercategoriescreate) | **POST** /api/v1/tournaments/{tournament_slug}/speaker-categories | Create speaker category |
| [**apiV1TournamentsSpeakerCategoriesCreate2**](SpeakerCategoriesApi.md#apiv1tournamentsspeakercategoriescreate2) | **POST** /api/v1/tournaments/{tournament_slug}/speaker-categories/{id} | Update speaker category |
| [**apiV1TournamentsSpeakerCategoriesDestroy**](SpeakerCategoriesApi.md#apiv1tournamentsspeakercategoriesdestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/speaker-categories/{id} | Delete speaker category |
| [**apiV1TournamentsSpeakerCategoriesEligibilityPartialUpdate**](SpeakerCategoriesApi.md#apiv1tournamentsspeakercategorieseligibilitypartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/speaker-categories/{id}/eligibility | Add speakers to category |
| [**apiV1TournamentsSpeakerCategoriesEligibilityRetrieve**](SpeakerCategoriesApi.md#apiv1tournamentsspeakercategorieseligibilityretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/speaker-categories/{id}/eligibility | Get speaker category membership |
| [**apiV1TournamentsSpeakerCategoriesEligibilityUpdate**](SpeakerCategoriesApi.md#apiv1tournamentsspeakercategorieseligibilityupdate) | **PUT** /api/v1/tournaments/{tournament_slug}/speaker-categories/{id}/eligibility | Update membership of speaker category |
| [**apiV1TournamentsSpeakerCategoriesList**](SpeakerCategoriesApi.md#apiv1tournamentsspeakercategorieslist) | **GET** /api/v1/tournaments/{tournament_slug}/speaker-categories | List tournament speaker categories |
| [**apiV1TournamentsSpeakerCategoriesPartialUpdate**](SpeakerCategoriesApi.md#apiv1tournamentsspeakercategoriespartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/speaker-categories/{id} | Patch speaker category |
| [**apiV1TournamentsSpeakerCategoriesRetrieve**](SpeakerCategoriesApi.md#apiv1tournamentsspeakercategoriesretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/speaker-categories/{id} | Get speaker category |



## apiV1TournamentsSpeakerCategoriesCreate

> SpeakerCategory apiV1TournamentsSpeakerCategoriesCreate(tournamentSlug, speakerCategory)

Create speaker category

### Example

```ts
import {
  Configuration,
  SpeakerCategoriesApi,
} from '';
import type { ApiV1TournamentsSpeakerCategoriesCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new SpeakerCategoriesApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // SpeakerCategory
    speakerCategory: ...,
  } satisfies ApiV1TournamentsSpeakerCategoriesCreateRequest;

  try {
    const data = await api.apiV1TournamentsSpeakerCategoriesCreate(body);
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
| **speakerCategory** | [SpeakerCategory](SpeakerCategory.md) |  | |

### Return type

[**SpeakerCategory**](SpeakerCategory.md)

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


## apiV1TournamentsSpeakerCategoriesCreate2

> SpeakerCategory apiV1TournamentsSpeakerCategoriesCreate2(id, tournamentSlug, speakerCategory)

Update speaker category

### Example

```ts
import {
  Configuration,
  SpeakerCategoriesApi,
} from '';
import type { ApiV1TournamentsSpeakerCategoriesCreate2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new SpeakerCategoriesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // SpeakerCategory
    speakerCategory: ...,
  } satisfies ApiV1TournamentsSpeakerCategoriesCreate2Request;

  try {
    const data = await api.apiV1TournamentsSpeakerCategoriesCreate2(body);
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
| **speakerCategory** | [SpeakerCategory](SpeakerCategory.md) |  | |

### Return type

[**SpeakerCategory**](SpeakerCategory.md)

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


## apiV1TournamentsSpeakerCategoriesDestroy

> apiV1TournamentsSpeakerCategoriesDestroy(id, tournamentSlug)

Delete speaker category

### Example

```ts
import {
  Configuration,
  SpeakerCategoriesApi,
} from '';
import type { ApiV1TournamentsSpeakerCategoriesDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new SpeakerCategoriesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsSpeakerCategoriesDestroyRequest;

  try {
    const data = await api.apiV1TournamentsSpeakerCategoriesDestroy(body);
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


## apiV1TournamentsSpeakerCategoriesEligibilityPartialUpdate

> SpeakerEligibility apiV1TournamentsSpeakerCategoriesEligibilityPartialUpdate(id, tournamentSlug, patchedSpeakerEligibility)

Add speakers to category

### Example

```ts
import {
  Configuration,
  SpeakerCategoriesApi,
} from '';
import type { ApiV1TournamentsSpeakerCategoriesEligibilityPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new SpeakerCategoriesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedSpeakerEligibility (optional)
    patchedSpeakerEligibility: ...,
  } satisfies ApiV1TournamentsSpeakerCategoriesEligibilityPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsSpeakerCategoriesEligibilityPartialUpdate(body);
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
| **patchedSpeakerEligibility** | [PatchedSpeakerEligibility](PatchedSpeakerEligibility.md) |  | [Optional] |

### Return type

[**SpeakerEligibility**](SpeakerEligibility.md)

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


## apiV1TournamentsSpeakerCategoriesEligibilityRetrieve

> SpeakerEligibility apiV1TournamentsSpeakerCategoriesEligibilityRetrieve(id, tournamentSlug)

Get speaker category membership

### Example

```ts
import {
  Configuration,
  SpeakerCategoriesApi,
} from '';
import type { ApiV1TournamentsSpeakerCategoriesEligibilityRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new SpeakerCategoriesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsSpeakerCategoriesEligibilityRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsSpeakerCategoriesEligibilityRetrieve(body);
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

[**SpeakerEligibility**](SpeakerEligibility.md)

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


## apiV1TournamentsSpeakerCategoriesEligibilityUpdate

> SpeakerEligibility apiV1TournamentsSpeakerCategoriesEligibilityUpdate(id, tournamentSlug, speakerEligibility)

Update membership of speaker category

### Example

```ts
import {
  Configuration,
  SpeakerCategoriesApi,
} from '';
import type { ApiV1TournamentsSpeakerCategoriesEligibilityUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new SpeakerCategoriesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // SpeakerEligibility
    speakerEligibility: ...,
  } satisfies ApiV1TournamentsSpeakerCategoriesEligibilityUpdateRequest;

  try {
    const data = await api.apiV1TournamentsSpeakerCategoriesEligibilityUpdate(body);
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
| **speakerEligibility** | [SpeakerEligibility](SpeakerEligibility.md) |  | |

### Return type

[**SpeakerEligibility**](SpeakerEligibility.md)

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


## apiV1TournamentsSpeakerCategoriesList

> Array&lt;SpeakerCategory&gt; apiV1TournamentsSpeakerCategoriesList(tournamentSlug, limit, offset)

List tournament speaker categories

### Example

```ts
import {
  Configuration,
  SpeakerCategoriesApi,
} from '';
import type { ApiV1TournamentsSpeakerCategoriesListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new SpeakerCategoriesApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
  } satisfies ApiV1TournamentsSpeakerCategoriesListRequest;

  try {
    const data = await api.apiV1TournamentsSpeakerCategoriesList(body);
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

[**Array&lt;SpeakerCategory&gt;**](SpeakerCategory.md)

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


## apiV1TournamentsSpeakerCategoriesPartialUpdate

> SpeakerCategory apiV1TournamentsSpeakerCategoriesPartialUpdate(id, tournamentSlug, patchedSpeakerCategory)

Patch speaker category

### Example

```ts
import {
  Configuration,
  SpeakerCategoriesApi,
} from '';
import type { ApiV1TournamentsSpeakerCategoriesPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new SpeakerCategoriesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedSpeakerCategory (optional)
    patchedSpeakerCategory: ...,
  } satisfies ApiV1TournamentsSpeakerCategoriesPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsSpeakerCategoriesPartialUpdate(body);
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
| **patchedSpeakerCategory** | [PatchedSpeakerCategory](PatchedSpeakerCategory.md) |  | [Optional] |

### Return type

[**SpeakerCategory**](SpeakerCategory.md)

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


## apiV1TournamentsSpeakerCategoriesRetrieve

> SpeakerCategory apiV1TournamentsSpeakerCategoriesRetrieve(id, tournamentSlug)

Get speaker category

### Example

```ts
import {
  Configuration,
  SpeakerCategoriesApi,
} from '';
import type { ApiV1TournamentsSpeakerCategoriesRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new SpeakerCategoriesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsSpeakerCategoriesRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsSpeakerCategoriesRetrieve(body);
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

[**SpeakerCategory**](SpeakerCategory.md)

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

