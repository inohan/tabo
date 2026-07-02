# BreakCategoriesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TournamentsBreakCategoriesBreakCreate**](BreakCategoriesApi.md#apiv1tournamentsbreakcategoriesbreakcreate) | **POST** /api/v1/tournaments/{tournament_slug}/break-categories/{id}/break | Generate break |
| [**apiV1TournamentsBreakCategoriesBreakDestroy**](BreakCategoriesApi.md#apiv1tournamentsbreakcategoriesbreakdestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/break-categories/{id}/break | Delete break |
| [**apiV1TournamentsBreakCategoriesBreakList**](BreakCategoriesApi.md#apiv1tournamentsbreakcategoriesbreaklist) | **GET** /api/v1/tournaments/{tournament_slug}/break-categories/{id}/break | Get breaking teams |
| [**apiV1TournamentsBreakCategoriesBreakPartialUpdate**](BreakCategoriesApi.md#apiv1tournamentsbreakcategoriesbreakpartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/break-categories/{id}/break | Update remark and regenerate break |
| [**apiV1TournamentsBreakCategoriesCreate**](BreakCategoriesApi.md#apiv1tournamentsbreakcategoriescreate) | **POST** /api/v1/tournaments/{tournament_slug}/break-categories | Create break category |
| [**apiV1TournamentsBreakCategoriesCreate2**](BreakCategoriesApi.md#apiv1tournamentsbreakcategoriescreate2) | **POST** /api/v1/tournaments/{tournament_slug}/break-categories/{id} | Update break category |
| [**apiV1TournamentsBreakCategoriesDestroy**](BreakCategoriesApi.md#apiv1tournamentsbreakcategoriesdestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/break-categories/{id} | Delete break category |
| [**apiV1TournamentsBreakCategoriesEligibilityPartialUpdate**](BreakCategoriesApi.md#apiv1tournamentsbreakcategorieseligibilitypartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/break-categories/{id}/eligibility | Add teams as break-eligible |
| [**apiV1TournamentsBreakCategoriesEligibilityRetrieve**](BreakCategoriesApi.md#apiv1tournamentsbreakcategorieseligibilityretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/break-categories/{id}/eligibility | Get break-eligible teams for category |
| [**apiV1TournamentsBreakCategoriesEligibilityUpdate**](BreakCategoriesApi.md#apiv1tournamentsbreakcategorieseligibilityupdate) | **PUT** /api/v1/tournaments/{tournament_slug}/break-categories/{id}/eligibility | Update break eligibility of teams |
| [**apiV1TournamentsBreakCategoriesList**](BreakCategoriesApi.md#apiv1tournamentsbreakcategorieslist) | **GET** /api/v1/tournaments/{tournament_slug}/break-categories | List tournament break categories |
| [**apiV1TournamentsBreakCategoriesPartialUpdate**](BreakCategoriesApi.md#apiv1tournamentsbreakcategoriespartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/break-categories/{id} | Patch break category |
| [**apiV1TournamentsBreakCategoriesRetrieve**](BreakCategoriesApi.md#apiv1tournamentsbreakcategoriesretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/break-categories/{id} | Get break category |



## apiV1TournamentsBreakCategoriesBreakCreate

> BreakingTeam apiV1TournamentsBreakCategoriesBreakCreate(id, tournamentSlug, breakingTeam)

Generate break

### Example

```ts
import {
  Configuration,
  BreakCategoriesApi,
} from '';
import type { ApiV1TournamentsBreakCategoriesBreakCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new BreakCategoriesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // BreakingTeam
    breakingTeam: ...,
  } satisfies ApiV1TournamentsBreakCategoriesBreakCreateRequest;

  try {
    const data = await api.apiV1TournamentsBreakCategoriesBreakCreate(body);
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
| **breakingTeam** | [BreakingTeam](BreakingTeam.md) |  | |

### Return type

[**BreakingTeam**](BreakingTeam.md)

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


## apiV1TournamentsBreakCategoriesBreakDestroy

> apiV1TournamentsBreakCategoriesBreakDestroy(id, tournamentSlug)

Delete break

Destroy is normally for a specific instance, now QuerySet.

### Example

```ts
import {
  Configuration,
  BreakCategoriesApi,
} from '';
import type { ApiV1TournamentsBreakCategoriesBreakDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new BreakCategoriesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsBreakCategoriesBreakDestroyRequest;

  try {
    const data = await api.apiV1TournamentsBreakCategoriesBreakDestroy(body);
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


## apiV1TournamentsBreakCategoriesBreakList

> Array&lt;BreakingTeam&gt; apiV1TournamentsBreakCategoriesBreakList(id, tournamentSlug)

Get breaking teams

### Example

```ts
import {
  Configuration,
  BreakCategoriesApi,
} from '';
import type { ApiV1TournamentsBreakCategoriesBreakListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new BreakCategoriesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsBreakCategoriesBreakListRequest;

  try {
    const data = await api.apiV1TournamentsBreakCategoriesBreakList(body);
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

[**Array&lt;BreakingTeam&gt;**](BreakingTeam.md)

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


## apiV1TournamentsBreakCategoriesBreakPartialUpdate

> BreakingTeam apiV1TournamentsBreakCategoriesBreakPartialUpdate(id, tournamentSlug, patchedBreakingTeam)

Update remark and regenerate break

### Example

```ts
import {
  Configuration,
  BreakCategoriesApi,
} from '';
import type { ApiV1TournamentsBreakCategoriesBreakPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new BreakCategoriesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedBreakingTeam (optional)
    patchedBreakingTeam: ...,
  } satisfies ApiV1TournamentsBreakCategoriesBreakPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsBreakCategoriesBreakPartialUpdate(body);
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
| **patchedBreakingTeam** | [PatchedBreakingTeam](PatchedBreakingTeam.md) |  | [Optional] |

### Return type

[**BreakingTeam**](BreakingTeam.md)

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


## apiV1TournamentsBreakCategoriesCreate

> BreakCategory apiV1TournamentsBreakCategoriesCreate(tournamentSlug, breakCategory)

Create break category

### Example

```ts
import {
  Configuration,
  BreakCategoriesApi,
} from '';
import type { ApiV1TournamentsBreakCategoriesCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new BreakCategoriesApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // BreakCategory
    breakCategory: ...,
  } satisfies ApiV1TournamentsBreakCategoriesCreateRequest;

  try {
    const data = await api.apiV1TournamentsBreakCategoriesCreate(body);
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
| **breakCategory** | [BreakCategory](BreakCategory.md) |  | |

### Return type

[**BreakCategory**](BreakCategory.md)

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


## apiV1TournamentsBreakCategoriesCreate2

> BreakCategory apiV1TournamentsBreakCategoriesCreate2(id, tournamentSlug, breakCategory)

Update break category

### Example

```ts
import {
  Configuration,
  BreakCategoriesApi,
} from '';
import type { ApiV1TournamentsBreakCategoriesCreate2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new BreakCategoriesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // BreakCategory
    breakCategory: ...,
  } satisfies ApiV1TournamentsBreakCategoriesCreate2Request;

  try {
    const data = await api.apiV1TournamentsBreakCategoriesCreate2(body);
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
| **breakCategory** | [BreakCategory](BreakCategory.md) |  | |

### Return type

[**BreakCategory**](BreakCategory.md)

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


## apiV1TournamentsBreakCategoriesDestroy

> apiV1TournamentsBreakCategoriesDestroy(id, tournamentSlug)

Delete break category

### Example

```ts
import {
  Configuration,
  BreakCategoriesApi,
} from '';
import type { ApiV1TournamentsBreakCategoriesDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new BreakCategoriesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsBreakCategoriesDestroyRequest;

  try {
    const data = await api.apiV1TournamentsBreakCategoriesDestroy(body);
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


## apiV1TournamentsBreakCategoriesEligibilityPartialUpdate

> BreakEligibility apiV1TournamentsBreakCategoriesEligibilityPartialUpdate(id, tournamentSlug, patchedBreakEligibility)

Add teams as break-eligible

### Example

```ts
import {
  Configuration,
  BreakCategoriesApi,
} from '';
import type { ApiV1TournamentsBreakCategoriesEligibilityPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new BreakCategoriesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedBreakEligibility (optional)
    patchedBreakEligibility: ...,
  } satisfies ApiV1TournamentsBreakCategoriesEligibilityPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsBreakCategoriesEligibilityPartialUpdate(body);
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
| **patchedBreakEligibility** | [PatchedBreakEligibility](PatchedBreakEligibility.md) |  | [Optional] |

### Return type

[**BreakEligibility**](BreakEligibility.md)

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


## apiV1TournamentsBreakCategoriesEligibilityRetrieve

> BreakEligibility apiV1TournamentsBreakCategoriesEligibilityRetrieve(id, tournamentSlug)

Get break-eligible teams for category

### Example

```ts
import {
  Configuration,
  BreakCategoriesApi,
} from '';
import type { ApiV1TournamentsBreakCategoriesEligibilityRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new BreakCategoriesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsBreakCategoriesEligibilityRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsBreakCategoriesEligibilityRetrieve(body);
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

[**BreakEligibility**](BreakEligibility.md)

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


## apiV1TournamentsBreakCategoriesEligibilityUpdate

> BreakEligibility apiV1TournamentsBreakCategoriesEligibilityUpdate(id, tournamentSlug, breakEligibility)

Update break eligibility of teams

### Example

```ts
import {
  Configuration,
  BreakCategoriesApi,
} from '';
import type { ApiV1TournamentsBreakCategoriesEligibilityUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new BreakCategoriesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // BreakEligibility
    breakEligibility: ...,
  } satisfies ApiV1TournamentsBreakCategoriesEligibilityUpdateRequest;

  try {
    const data = await api.apiV1TournamentsBreakCategoriesEligibilityUpdate(body);
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
| **breakEligibility** | [BreakEligibility](BreakEligibility.md) |  | |

### Return type

[**BreakEligibility**](BreakEligibility.md)

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


## apiV1TournamentsBreakCategoriesList

> Array&lt;BreakCategory&gt; apiV1TournamentsBreakCategoriesList(tournamentSlug, limit, offset)

List tournament break categories

### Example

```ts
import {
  Configuration,
  BreakCategoriesApi,
} from '';
import type { ApiV1TournamentsBreakCategoriesListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new BreakCategoriesApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
  } satisfies ApiV1TournamentsBreakCategoriesListRequest;

  try {
    const data = await api.apiV1TournamentsBreakCategoriesList(body);
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

[**Array&lt;BreakCategory&gt;**](BreakCategory.md)

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


## apiV1TournamentsBreakCategoriesPartialUpdate

> BreakCategory apiV1TournamentsBreakCategoriesPartialUpdate(id, tournamentSlug, patchedBreakCategory)

Patch break category

### Example

```ts
import {
  Configuration,
  BreakCategoriesApi,
} from '';
import type { ApiV1TournamentsBreakCategoriesPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new BreakCategoriesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedBreakCategory (optional)
    patchedBreakCategory: ...,
  } satisfies ApiV1TournamentsBreakCategoriesPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsBreakCategoriesPartialUpdate(body);
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
| **patchedBreakCategory** | [PatchedBreakCategory](PatchedBreakCategory.md) |  | [Optional] |

### Return type

[**BreakCategory**](BreakCategory.md)

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


## apiV1TournamentsBreakCategoriesRetrieve

> BreakCategory apiV1TournamentsBreakCategoriesRetrieve(id, tournamentSlug)

Get break category

### Example

```ts
import {
  Configuration,
  BreakCategoriesApi,
} from '';
import type { ApiV1TournamentsBreakCategoriesRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new BreakCategoriesApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsBreakCategoriesRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsBreakCategoriesRetrieve(body);
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

[**BreakCategory**](BreakCategory.md)

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

