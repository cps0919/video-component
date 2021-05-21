import direction from './direction/main.vue'
import moreVideo from './more-video/main.vue'

const components = [direction,moreVideo]
export default {
    install: (app) => {
        components.map(component => {
            app.component(component.name, component)
        })
    },
    ...components
}