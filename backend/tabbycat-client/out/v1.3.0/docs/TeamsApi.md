# TeamsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TournamentsSpeakersCheckinCreate**](TeamsApi.md#apiv1tournamentsspeakerscheckincreate) | **POST** /api/v1/tournaments/{tournament_slug}/speakers/{id}/checkin | Create speaker checkin identifier |
| [**apiV1TournamentsSpeakersCheckinDestroy**](TeamsApi.md#apiv1tournamentsspeakerscheckindestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/speakers/{id}/checkin | Check out speaker |
| [**apiV1TournamentsSpeakersCheckinPartialUpdate**](TeamsApi.md#apiv1tournamentsspeakerscheckinpartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/speakers/{id}/checkin | Toggle speaker checkin status |
| [**apiV1TournamentsSpeakersCheckinRetrieve**](TeamsApi.md#apiv1tournamentsspeakerscheckinretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/speakers/{id}/checkin | Get speaker checkin status |
| [**apiV1TournamentsSpeakersCheckinUpdate**](TeamsApi.md#apiv1tournamentsspeakerscheckinupdate) | **PUT** /api/v1/tournaments/{tournament_slug}/speakers/{id}/checkin | Check in speaker |
| [**apiV1TournamentsSpeakersCreate**](TeamsApi.md#apiv1tournamentsspeakerscreate) | **POST** /api/v1/tournaments/{tournament_slug}/speakers | Add speaker |
| [**apiV1TournamentsSpeakersCreate2**](TeamsApi.md#apiv1tournamentsspeakerscreate2) | **POST** /api/v1/tournaments/{tournament_slug}/speakers/{id} | Update speaker |
| [**apiV1TournamentsSpeakersDestroy**](TeamsApi.md#apiv1tournamentsspeakersdestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/speakers/{id} | Delete speaker |
| [**apiV1TournamentsSpeakersList**](TeamsApi.md#apiv1tournamentsspeakerslist) | **GET** /api/v1/tournaments/{tournament_slug}/speakers | List speakers in tournament |
| [**apiV1TournamentsSpeakersPartialUpdate**](TeamsApi.md#apiv1tournamentsspeakerspartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/speakers/{id} | Patch speaker |
| [**apiV1TournamentsSpeakersRetrieve**](TeamsApi.md#apiv1tournamentsspeakersretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/speakers/{id} | Get speaker |
| [**apiV1TournamentsTeamsCreate**](TeamsApi.md#apiv1tournamentsteamscreate) | **POST** /api/v1/tournaments/{tournament_slug}/teams | Create team |
| [**apiV1TournamentsTeamsCreate2**](TeamsApi.md#apiv1tournamentsteamscreate2) | **POST** /api/v1/tournaments/{tournament_slug}/teams/{id} | Update team |
| [**apiV1TournamentsTeamsDestroy**](TeamsApi.md#apiv1tournamentsteamsdestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/teams/{id} | Delete team |
| [**apiV1TournamentsTeamsList**](TeamsApi.md#apiv1tournamentsteamslist) | **GET** /api/v1/tournaments/{tournament_slug}/teams | List teams in tournament |
| [**apiV1TournamentsTeamsPartialUpdate**](TeamsApi.md#apiv1tournamentsteamspartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/teams/{id} | Patch team |
| [**apiV1TournamentsTeamsRetrieve**](TeamsApi.md#apiv1tournamentsteamsretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/teams/{id} | Get team |



## apiV1TournamentsSpeakersCheckinCreate

> Checkin apiV1TournamentsSpeakersCheckinCreate(id, tournamentSlug)

Create speaker checkin identifier

Creates an identifier

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from '';
import type { ApiV1TournamentsSpeakersCheckinCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TeamsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsSpeakersCheckinCreateRequest;

  try {
    const data = await api.apiV1TournamentsSpeakersCheckinCreate(body);
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

[**Checkin**](Checkin.md)

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


## apiV1TournamentsSpeakersCheckinDestroy

> Checkin apiV1TournamentsSpeakersCheckinDestroy(id, tournamentSlug)

Check out speaker

Checks out

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from '';
import type { ApiV1TournamentsSpeakersCheckinDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TeamsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsSpeakersCheckinDestroyRequest;

  try {
    const data = await api.apiV1TournamentsSpeakersCheckinDestroy(body);
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

[**Checkin**](Checkin.md)

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


## apiV1TournamentsSpeakersCheckinPartialUpdate

> Checkin apiV1TournamentsSpeakersCheckinPartialUpdate(id, tournamentSlug)

Toggle speaker checkin status

Toggles the check-in status

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from '';
import type { ApiV1TournamentsSpeakersCheckinPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TeamsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsSpeakersCheckinPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsSpeakersCheckinPartialUpdate(body);
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

[**Checkin**](Checkin.md)

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


## apiV1TournamentsSpeakersCheckinRetrieve

> Checkin apiV1TournamentsSpeakersCheckinRetrieve(id, tournamentSlug)

Get speaker checkin status

Get checkin status

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from '';
import type { ApiV1TournamentsSpeakersCheckinRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TeamsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsSpeakersCheckinRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsSpeakersCheckinRetrieve(body);
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

[**Checkin**](Checkin.md)

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


## apiV1TournamentsSpeakersCheckinUpdate

> Checkin apiV1TournamentsSpeakersCheckinUpdate(id, tournamentSlug)

Check in speaker

Checks in

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from '';
import type { ApiV1TournamentsSpeakersCheckinUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TeamsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsSpeakersCheckinUpdateRequest;

  try {
    const data = await api.apiV1TournamentsSpeakersCheckinUpdate(body);
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

[**Checkin**](Checkin.md)

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


## apiV1TournamentsSpeakersCreate

> Speaker apiV1TournamentsSpeakersCreate(tournamentSlug, speaker)

Add speaker

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from '';
import type { ApiV1TournamentsSpeakersCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TeamsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Speaker
    speaker: ...,
  } satisfies ApiV1TournamentsSpeakersCreateRequest;

  try {
    const data = await api.apiV1TournamentsSpeakersCreate(body);
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
| **speaker** | [Speaker](Speaker.md) |  | |

### Return type

[**Speaker**](Speaker.md)

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


## apiV1TournamentsSpeakersCreate2

> Speaker apiV1TournamentsSpeakersCreate2(id, tournamentSlug, speaker)

Update speaker

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from '';
import type { ApiV1TournamentsSpeakersCreate2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TeamsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Speaker
    speaker: ...,
  } satisfies ApiV1TournamentsSpeakersCreate2Request;

  try {
    const data = await api.apiV1TournamentsSpeakersCreate2(body);
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
| **speaker** | [Speaker](Speaker.md) |  | |

### Return type

[**Speaker**](Speaker.md)

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


## apiV1TournamentsSpeakersDestroy

> apiV1TournamentsSpeakersDestroy(id, tournamentSlug)

Delete speaker

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from '';
import type { ApiV1TournamentsSpeakersDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TeamsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsSpeakersDestroyRequest;

  try {
    const data = await api.apiV1TournamentsSpeakersDestroy(body);
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


## apiV1TournamentsSpeakersList

> Array&lt;Speaker&gt; apiV1TournamentsSpeakersList(tournamentSlug, limit, offset)

List speakers in tournament

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from '';
import type { ApiV1TournamentsSpeakersListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TeamsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
  } satisfies ApiV1TournamentsSpeakersListRequest;

  try {
    const data = await api.apiV1TournamentsSpeakersList(body);
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

[**Array&lt;Speaker&gt;**](Speaker.md)

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


## apiV1TournamentsSpeakersPartialUpdate

> Speaker apiV1TournamentsSpeakersPartialUpdate(id, tournamentSlug, patchedSpeaker)

Patch speaker

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from '';
import type { ApiV1TournamentsSpeakersPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TeamsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedSpeaker (optional)
    patchedSpeaker: ...,
  } satisfies ApiV1TournamentsSpeakersPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsSpeakersPartialUpdate(body);
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
| **patchedSpeaker** | [PatchedSpeaker](PatchedSpeaker.md) |  | [Optional] |

### Return type

[**Speaker**](Speaker.md)

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


## apiV1TournamentsSpeakersRetrieve

> Speaker apiV1TournamentsSpeakersRetrieve(id, tournamentSlug)

Get speaker

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from '';
import type { ApiV1TournamentsSpeakersRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TeamsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsSpeakersRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsSpeakersRetrieve(body);
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

[**Speaker**](Speaker.md)

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


## apiV1TournamentsTeamsCreate

> Team apiV1TournamentsTeamsCreate(tournamentSlug, team)

Create team

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from '';
import type { ApiV1TournamentsTeamsCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TeamsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Team (optional)
    team: ...,
  } satisfies ApiV1TournamentsTeamsCreateRequest;

  try {
    const data = await api.apiV1TournamentsTeamsCreate(body);
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
| **team** | [Team](Team.md) |  | [Optional] |

### Return type

[**Team**](Team.md)

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


## apiV1TournamentsTeamsCreate2

> Team apiV1TournamentsTeamsCreate2(id, tournamentSlug, team)

Update team

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from '';
import type { ApiV1TournamentsTeamsCreate2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TeamsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Team (optional)
    team: ...,
  } satisfies ApiV1TournamentsTeamsCreate2Request;

  try {
    const data = await api.apiV1TournamentsTeamsCreate2(body);
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
| **team** | [Team](Team.md) |  | [Optional] |

### Return type

[**Team**](Team.md)

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


## apiV1TournamentsTeamsDestroy

> apiV1TournamentsTeamsDestroy(id, tournamentSlug)

Delete team

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from '';
import type { ApiV1TournamentsTeamsDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TeamsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsTeamsDestroyRequest;

  try {
    const data = await api.apiV1TournamentsTeamsDestroy(body);
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


## apiV1TournamentsTeamsList

> Array&lt;Team&gt; apiV1TournamentsTeamsList(tournamentSlug, limit, offset)

List teams in tournament

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from '';
import type { ApiV1TournamentsTeamsListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TeamsApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
  } satisfies ApiV1TournamentsTeamsListRequest;

  try {
    const data = await api.apiV1TournamentsTeamsList(body);
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

[**Array&lt;Team&gt;**](Team.md)

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


## apiV1TournamentsTeamsPartialUpdate

> Team apiV1TournamentsTeamsPartialUpdate(id, tournamentSlug, patchedTeam)

Patch team

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from '';
import type { ApiV1TournamentsTeamsPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TeamsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedTeam (optional)
    patchedTeam: ...,
  } satisfies ApiV1TournamentsTeamsPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsTeamsPartialUpdate(body);
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
| **patchedTeam** | [PatchedTeam](PatchedTeam.md) |  | [Optional] |

### Return type

[**Team**](Team.md)

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


## apiV1TournamentsTeamsRetrieve

> Team apiV1TournamentsTeamsRetrieve(id, tournamentSlug)

Get team

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from '';
import type { ApiV1TournamentsTeamsRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new TeamsApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsTeamsRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsTeamsRetrieve(body);
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

[**Team**](Team.md)

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

