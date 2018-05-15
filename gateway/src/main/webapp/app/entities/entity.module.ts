import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewaySpeakerModule } from './speaker/speaker.module';
import { GatewaySessionModule } from './session/session.module';
import { GatewayPostModule } from './post/post.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewaySpeakerModule,
        GatewaySessionModule,
        GatewayPostModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
