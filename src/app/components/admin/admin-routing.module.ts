import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

//importar AuthGuard
import { AuthGuard } from './../../shared/guards/auth.guard';

//Importo lista posts
//import { ListPostsModule } from '../posts/list-posts/list-posts.module';

const routes: Routes = [
  { path: '', 
  component: AdminComponent,
  //agregar CanActivate
  canActivate: [AuthGuard],
  //ruta para Posts desde admin
  children:[
    {
      path:'posts',
      loadChildren: () =>
      import ('../posts/list-posts/list-posts.module').then(
        m => m.ListPostsModule
      )
    },
    { path: 'profile', 
    loadChildren: () => 
    import('./profile/profile.module').then(m => m.ProfileModule) }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
