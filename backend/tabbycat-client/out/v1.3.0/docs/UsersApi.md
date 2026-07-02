# UsersApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TournamentsUserGroupsCreate**](UsersApi.md#apiv1tournamentsusergroupscreate) | **POST** /api/v1/tournaments/{tournament_slug}/user-groups | Create group |
| [**apiV1TournamentsUserGroupsCreate2**](UsersApi.md#apiv1tournamentsusergroupscreate2) | **POST** /api/v1/tournaments/{tournament_slug}/user-groups/{id} | Update group |
| [**apiV1TournamentsUserGroupsDestroy**](UsersApi.md#apiv1tournamentsusergroupsdestroy) | **DELETE** /api/v1/tournaments/{tournament_slug}/user-groups/{id} | Delete group |
| [**apiV1TournamentsUserGroupsList**](UsersApi.md#apiv1tournamentsusergroupslist) | **GET** /api/v1/tournaments/{tournament_slug}/user-groups | List all permission groups in tournament |
| [**apiV1TournamentsUserGroupsPartialUpdate**](UsersApi.md#apiv1tournamentsusergroupspartialupdate) | **PATCH** /api/v1/tournaments/{tournament_slug}/user-groups/{id} | Patch group |
| [**apiV1TournamentsUserGroupsRetrieve**](UsersApi.md#apiv1tournamentsusergroupsretrieve) | **GET** /api/v1/tournaments/{tournament_slug}/user-groups/{id} | Get group |
| [**apiV1UsersCreate**](UsersApi.md#apiv1userscreate) | **POST** /api/v1/users | Create user |
| [**apiV1UsersCreate2**](UsersApi.md#apiv1userscreate2) | **POST** /api/v1/users/{id} | Update user |
| [**apiV1UsersDestroy**](UsersApi.md#apiv1usersdestroy) | **DELETE** /api/v1/users/{id} | Deactivate user |
| [**apiV1UsersList**](UsersApi.md#apiv1userslist) | **GET** /api/v1/users | List all users |
| [**apiV1UsersMeRetrieve**](UsersApi.md#apiv1usersmeretrieve) | **GET** /api/v1/users/me | Get own user information |
| [**apiV1UsersPartialUpdate**](UsersApi.md#apiv1userspartialupdate) | **PATCH** /api/v1/users/{id} | Patch user |
| [**apiV1UsersRetrieve**](UsersApi.md#apiv1usersretrieve) | **GET** /api/v1/users/{id} | Get user |



## apiV1TournamentsUserGroupsCreate

> Group apiV1TournamentsUserGroupsCreate(tournamentSlug, group)

Create group

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiV1TournamentsUserGroupsCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new UsersApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Group
    group: ...,
  } satisfies ApiV1TournamentsUserGroupsCreateRequest;

  try {
    const data = await api.apiV1TournamentsUserGroupsCreate(body);
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
| **group** | [Group](Group.md) |  | |

### Return type

[**Group**](Group.md)

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


## apiV1TournamentsUserGroupsCreate2

> Group apiV1TournamentsUserGroupsCreate2(id, tournamentSlug, group)

Update group

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiV1TournamentsUserGroupsCreate2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new UsersApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // Group
    group: ...,
  } satisfies ApiV1TournamentsUserGroupsCreate2Request;

  try {
    const data = await api.apiV1TournamentsUserGroupsCreate2(body);
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
| **group** | [Group](Group.md) |  | |

### Return type

[**Group**](Group.md)

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


## apiV1TournamentsUserGroupsDestroy

> apiV1TournamentsUserGroupsDestroy(id, tournamentSlug)

Delete group

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiV1TournamentsUserGroupsDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new UsersApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsUserGroupsDestroyRequest;

  try {
    const data = await api.apiV1TournamentsUserGroupsDestroy(body);
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


## apiV1TournamentsUserGroupsList

> Array&lt;Group&gt; apiV1TournamentsUserGroupsList(tournamentSlug, limit, offset)

List all permission groups in tournament

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiV1TournamentsUserGroupsListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new UsersApi(config);

  const body = {
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
  } satisfies ApiV1TournamentsUserGroupsListRequest;

  try {
    const data = await api.apiV1TournamentsUserGroupsList(body);
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

[**Array&lt;Group&gt;**](Group.md)

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


## apiV1TournamentsUserGroupsPartialUpdate

> Group apiV1TournamentsUserGroupsPartialUpdate(id, tournamentSlug, patchedGroup)

Patch group

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiV1TournamentsUserGroupsPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new UsersApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
    // PatchedGroup (optional)
    patchedGroup: ...,
  } satisfies ApiV1TournamentsUserGroupsPartialUpdateRequest;

  try {
    const data = await api.apiV1TournamentsUserGroupsPartialUpdate(body);
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
| **patchedGroup** | [PatchedGroup](PatchedGroup.md) |  | [Optional] |

### Return type

[**Group**](Group.md)

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


## apiV1TournamentsUserGroupsRetrieve

> Group apiV1TournamentsUserGroupsRetrieve(id, tournamentSlug)

Get group

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiV1TournamentsUserGroupsRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new UsersApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // string | The tournament\'s slug
    tournamentSlug: tournamentSlug_example,
  } satisfies ApiV1TournamentsUserGroupsRetrieveRequest;

  try {
    const data = await api.apiV1TournamentsUserGroupsRetrieve(body);
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

[**Group**](Group.md)

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


## apiV1UsersCreate

> User apiV1UsersCreate(user)

Create user

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiV1UsersCreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new UsersApi(config);

  const body = {
    // User
    user: ...,
  } satisfies ApiV1UsersCreateRequest;

  try {
    const data = await api.apiV1UsersCreate(body);
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
| **user** | [User](User.md) |  | |

### Return type

[**User**](User.md)

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


## apiV1UsersCreate2

> User apiV1UsersCreate2(id, user)

Update user

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiV1UsersCreate2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new UsersApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // User
    user: ...,
  } satisfies ApiV1UsersCreate2Request;

  try {
    const data = await api.apiV1UsersCreate2(body);
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
| **user** | [User](User.md) |  | |

### Return type

[**User**](User.md)

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


## apiV1UsersDestroy

> apiV1UsersDestroy(id)

Deactivate user

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiV1UsersDestroyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new UsersApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
  } satisfies ApiV1UsersDestroyRequest;

  try {
    const data = await api.apiV1UsersDestroy(body);
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


## apiV1UsersList

> Array&lt;User&gt; apiV1UsersList(limit, offset)

List all users

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiV1UsersListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new UsersApi(config);

  const body = {
    // number | Number of results to return per page. (optional)
    limit: 56,
    // number | The initial index from which to return the results. (optional)
    offset: 56,
  } satisfies ApiV1UsersListRequest;

  try {
    const data = await api.apiV1UsersList(body);
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
| **limit** | `number` | Number of results to return per page. | [Optional] [Defaults to `undefined`] |
| **offset** | `number` | The initial index from which to return the results. | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;User&gt;**](User.md)

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


## apiV1UsersMeRetrieve

> User apiV1UsersMeRetrieve(id)

Get own user information

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiV1UsersMeRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new UsersApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
  } satisfies ApiV1UsersMeRetrieveRequest;

  try {
    const data = await api.apiV1UsersMeRetrieve(body);
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

### Return type

[**User**](User.md)

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


## apiV1UsersPartialUpdate

> User apiV1UsersPartialUpdate(id, patchedUser)

Patch user

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiV1UsersPartialUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new UsersApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
    // PatchedUser (optional)
    patchedUser: ...,
  } satisfies ApiV1UsersPartialUpdateRequest;

  try {
    const data = await api.apiV1UsersPartialUpdate(body);
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
| **patchedUser** | [PatchedUser](PatchedUser.md) |  | [Optional] |

### Return type

[**User**](User.md)

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


## apiV1UsersRetrieve

> User apiV1UsersRetrieve(id)

Get user

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiV1UsersRetrieveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: tokenAuth
    apiKey: "YOUR API KEY",
    // To configure API key authorization: cookieAuth
    apiKey: "YOUR API KEY",
  });
  const api = new UsersApi(config);

  const body = {
    // number | The object\'s primary key
    id: 56,
  } satisfies ApiV1UsersRetrieveRequest;

  try {
    const data = await api.apiV1UsersRetrieve(body);
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

### Return type

[**User**](User.md)

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

