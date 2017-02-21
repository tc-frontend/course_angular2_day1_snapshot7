Angular 2: Getting Started - SnapShot 7
===================
En esta parte veremos estos contenidos del curso de Pluralshight:

 - Navigation and routing basics
 - Navigation and routing Additional techniques

----------


### 1 - Navigation and routing basics


----------


Para poder ver como aprender conceptos básicos de routing vamos a crear un nuevo componente que nos muestre el detalle de un producto. De este modo tendremos tres componentes con los que poder navegar: Welcome, Product List y Product Detail
![enter image description here](https://i.imgur.com/yNmpHEf.png)

#### Configuring routes
La configuración de las rutas las haremos mediante el RouterModule el cual lo definiremos en app.module y definiremos las rutas con el metodo forRoot. Este método requiere un objeto de este tipo:

![enter image description here](https://i.imgur.com/6hwcnDP.png)

Necesitamos añadir el tag base dentro de head:

    <base href="/">
#### Tying routes to actions
Necesitamos asociar rutas a acciones para eso utilizaremos

    <a [routerLink] = "['/welcome']">Home</a>
#### Placing the views
Necesitamos indicar al router donde se mostrarán los componentes a os que navegamos. Para ello utilizaremos:

    <router-outlet></router.outlet>


----------

### 2 - Navigation and routing Additional techniques

----------


#### Passing parameters to a route
 Para pasar un parámetro debemos declararlo en el path dentro del RouterModule

    path: 'product/:id'
Para indicar que valor le pasamos utilizaremos se lo indicaremos al routerLink de este modo

    <a [routerLink] = "['/product', product.productId]">
    {{ product.poductName }}</a>
Podemos obtener el oarametro dentro del componente de varias formas. En este caso utilizaremos ActiveRoute y el snapshot property

![enter image description here](https://i.imgur.com/jB5wgdw.png)

Si el parámetro cambia dentro de la vista, por ejemplo, un botón para mostrar el siguiente producto necesitaríamos algo como esto:

    export class AppComponent implements OnInit { 
    
	    currentUrl : string;
	    constructor(private _router : Router){
	        this.currentUrl = ''
	    }
	 
	    ngOnInit() {
	        this._router.subscribe(
	            currentUrl => this.currentUrl = currentUrl,
	            error => console.log(error)
	        );
	    } 
    }

#### Activting a route with code
Si queremos navegar programáticamente utilizaremos:

    this._router.navigate(['/products'])

#### Protecting routes with guards
En muchas ocasiones necesitamos proteger una determinada ruta o simplemente confirmar que se quiere navegar con un formulario sin completar. Para ellos utilizaremos guards:

![enter image description here](https://i.imgur.com/29bjrec.png)


Para ello clonamos el **SnapShot 7** desde el primer commit:

    git clone https://github.com/tc-frontend/course_angular2_day1_snapshot7
    cd course_angular2_day1_snapshot7
    git checkout tags/init
    npm install
    code .
 

----------

#### 1 - Crear un componente detalle básico

https://goo.gl/dlO44B

----------

#### 2 - Creamos el RouteModel segun lo visto antes

    RouterModule.forRoot([
      {path:'products', component: ProductListComponent},
      {path:'product/:id, component: ProductDetailComponent},
      {path:'welcome', component: WelcomeComponent},
      {path:'', redirectTo: 'welcome', pathMatch: 'full'},
      {path:'**', redirectTo: 'welcome', pathMatch: 'full'}
    ])

Ponemos el enlace en el componente principal.

    <li><a [routerLink]="['/products']">Product List</a></li>

https://goo.gl/VvvE0y


----------

#### 3 - Enlaces y back button

En la lista de productos ponemos un **routerLink** por cada producto.

    <td>
        <a [routerLink]="['/product', product.productId]">
            {{product.productName}}
        </a>
    </td>

En el evento onInit obtenemos el número de producto

    let id = +this._route.snapshot.params['id'];

https://goo.gl/jLvs61

----------

#### 4 - Creamos un Guard que verifica que el número de producto sea correcto

Actualizamos la ruta de edición para que ejecute un guard antes de activar la ruta:
      { path:'product/:id', 
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent},

El guard sería:


    import { Injectable } from '@angular/core';
    import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

    @Injectable()
    export class ProductDetailGuard implements CanActivate {

        constructor(private _router: Router) {
        }

        canActivate(route: ActivatedRouteSnapshot): boolean {
            let id = +route.url[1].path;
            if (isNaN(id) || id < 1) {
                alert('Invalid product Id');
                // start a new navigation to redirect to list page
                this._router.navigate(['/products']);
                // abort current navigation
                return false;
            };
            return true;
        }
    }

https://goo.gl/rwKjl7

----------



Podemos ver los pasos detallados en el historial de commits:

https://goo.gl/KxWyXF  
  
Si queremos ver la App en nuestro browser

    npm start

Si queremos ver la solución final de este SnapShot:

    git checkout master
    npm install
    npm start



