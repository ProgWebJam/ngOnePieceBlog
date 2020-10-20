import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { PostComponent } from './components/posts/post/post.component';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { DetailsPostComponent } from './components/posts/details-post/details-post.component';


const routes: Routes = [
  //Cuando la ruta esta en blanco redireciona  a home
  //{ path:'' , redirectTo:'/home', pathMatch:'full'},

  //Se modifico el componente que se renderiza
  { path:'' , component:ContainerAppComponent,
  //Se creo hijo donde se paso todas las rutas que tenia
    children: [

  //ruta home
    { 
      path: 'home', 
      loadChildren: () => 
      import('./components/pages/home/home.module').then(m => m.HomeModule) 
    }, 

  //ruta post con id
    //{ path: 'post/:id', component: PostComponent },
  //ruta post con id randerizada a detailsPost
  { path: 'post/:id', component: DetailsPostComponent },

  //ruta about
    { 
      path: 'about', 
      loadChildren: () => 
      import('./components/pages/about/about.module').then(m => m.AboutModule)
    },

    { path:'' , redirectTo:'/home', pathMatch:'full'},

    ]
  },
/*
  //ruta home
  { 
    path: 'home', 
    loadChildren: () => 
    import('./components/pages/home/home.module').then(m => m.HomeModule) 
  }, 

  //ruta post con id
  { path: 'post/:id', component: PostComponent },

  //ruta about
  { 
    path: 'about', 
    loadChildren: () => 
    import('./components/pages/about/about.module').then(m => m.AboutModule)
  }, 
  */

  //{ path: 'about', loadChildren: () => import('./components/pages/about/about.module').then(m => m.AboutModule) },
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
  { path: 'login', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
