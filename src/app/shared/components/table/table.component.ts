//para utilizar paginacion se debe importar una directiva : ViewChild
//Metodo AfterViewInit
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
//Importar modulo tabla
import {MatTableDataSource} from '@angular/material/table';
//Importar modulo paginacion
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
//importar organizar columna de tabla
import { MatSort } from '@angular/material/sort';
//Importa service
import { PostService } from '../../../components/posts/post.service';
import { PostI } from '../../models/post.interface';
// Importar sweetalert2
import Swal from 'sweetalert2';
//importar materia dialog
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './../modal/modal.component';
/*
//Importar interface tabla
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


//Importar  array tabla prueba
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
*/

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  //Columnas de la tabla que se encuentra en firebase
  displayedColumns: string[] = ['titlePost', 'tagsPost','actions'];
  /*prueba
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  */
 dataSource = new MatTableDataSource();

  //Paginacion
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  //organizar columna de tabla
   @ViewChild(MatSort, {static: true}) sort: MatSort;



//Inyectamos el service al constructor
  constructor(private postSvc: PostService, public dialog: MatDialog) { }

  ngOnInit() {
    //recuperar los datos que viene del service prueba
    //this.postSvc.getAllPosts().subscribe(res => console.log('POSTS', res));
    this.postSvc
    .getAllPosts()
    .subscribe(posts => (this.dataSource.data = posts));
  }

  //Metodo inicio de ciclo de vida del componente para visualizar
  ngAfterViewInit(){
    //Para que funcione la paginacion
    this.dataSource.paginator = this.paginator;

    //Para que funcione Sort
    this.dataSource.sort = this.sort;
  }

  //Metodo filtrar en tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

  //Metodo editar
  onEditPost(post:PostI){
    console.log('Edit post', post);
    //mostrar formulario new con id
    this.openDialog(post);

  }
  //Metodo eliminar 
  onDeletetPost(post:PostI){
    console.log('Delete post', post);

    //metodo : Mensaje alerta eliminar post con sweetalert2
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
      //nos devuelve una promesa
    }).then((result) => {
      if (result.value) {
        //console.log('Delete');
        //Llamamos el metodo delete desde post.service
        this.postSvc.deletePostById(post)
        //devuelve una promesa
        .then(() => {
          Swal.fire(
            'Deleted!',
            'Your post has been deleted.',
            'success'
          );
        }).catch( (error) => {
          Swal.fire(
            'Error!',
            'There was an error deleting this post.',
            'error'
          );
        })
        
      }
    });
  }

  //Metodo Nuevo
  onNewPost(){
    //console.log('New post');
    this.openDialog();
  }

  //metodo open dialog
  openDialog(post?:PostI):void{
    //Condicion cuando es para editar o nuevo post
    const config = {
      data:{
        message: post ? 'Edit Post' : 'New Post',
        content: post
      }
    };
    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
    })

  }

}

