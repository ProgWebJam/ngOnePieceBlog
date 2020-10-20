import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { NewPostModule } from './components/posts/new-post/new-post.module';
//import { PostComponent } from './components/posts/post/post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//importar Material
import { MaterialModule } from './material.module';

import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';

//importar Firebase
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket, BUCKET } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
//importar autenticacion
import { AngularFireAuthModule } from '@angular/fire/auth';
//importar formulario reactivo
import { ReactiveFormsModule } from '@angular/forms';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { EditPostComponent } from './components/posts/edit-post/edit-post.component';
import { EditPostModule } from './components/posts/edit-post/edit-post.module';
import { DetailsPostComponent } from './components/posts/details-post/details-post.component';
//import { TableComponent } from './shared/components/table/table.component';


@NgModule({
  declarations: [
    AppComponent,
    NewPostComponent,
    //PostComponent,
    ToolbarComponent,
    ContainerAppComponent,
    ModalComponent,
    EditPostComponent,
    DetailsPostComponent,
    //TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NewPostModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    //PARAMETRO DE CONEXION : firebaseConfig es como lo llame en environment.ts
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule,
    EditPostModule

  ],
  //Para que el componente “modal” puede estar disponible  en toda la aplicacion
  entryComponents: [ModalComponent],
  providers: [
    //CONFIGURACION BACKEND FIREBASE
    //{ provide: StorageBucket, useValue: 'gs://ngblog-5b203.appspot.com' }
    { provide: BUCKET, useValue: 'gs://ngblog-5b203.appspot.com' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
