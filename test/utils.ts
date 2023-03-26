import { flushPromises } from "@vue/test-utils"
import { expect } from "vitest"
import { RouteLocationNormalizedLoaded, RouteLocationRaw, Router } from "vue-router"

export async function navigate(router: Router, from: RouteLocationRaw, to: RouteLocationRaw): Promise<RouteLocationNormalizedLoaded> {
    router.push(from)
    await flushPromises()
    router.push(to)
    await flushPromises()
    return router.currentRoute.value
}

export async function navigationShouldAccept(router: Router, from: RouteLocationRaw, to: RouteLocationRaw): Promise<void> {
    const location = await navigate(
        router,
        from,
        to
    )
    expect(location.fullPath).toEqual(to)
}