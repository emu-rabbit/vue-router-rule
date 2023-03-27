import { flushPromises } from "@vue/test-utils"
import { expect, it } from "vitest"
import { RouteLocationNormalizedLoaded, RouteLocationRaw, Router } from "vue-router"

export async function navigate(router: Router, from: RouteLocationRaw, to: RouteLocationRaw): Promise<RouteLocationNormalizedLoaded> {
    router.push(from)
    await flushPromises()
    router.push(to)
    await flushPromises()
    return router.currentRoute.value
}

export class NavigationTest {
    constructor(
        private readonly router: Router
    ) {}

    shouldAccept(from: string, to: string): void {
        it(`Accept from "${from}" to "${to}"`, async() => {
            const location = await navigate(
                this.router,
                from,
                to
            )
            expect(location.fullPath).toEqual(to)
        })
    }

    shouldDeny(from: string, to: string): void {
        it(`Deny from "${from}" to "${to}"`, async() => {
            const location = await navigate(
                this.router,
                from,
                to
            )
            expect(location.fullPath).toEqual(from)
        })
    }

    shouldRedirect(from: string, to: string, redirect: string): void {
        it(`Redirect from "${from}" to "${to}"`, async() => {
            const location = await navigate(
                this.router,
                from,
                to
            )
            expect(location.fullPath).toEqual(redirect)
        })
    }
}
