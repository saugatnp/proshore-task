import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProduct } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  editProductForm!: FormGroup;
  productId!: number;
  product!: IProduct;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService
  ) { }



  /**
   * gets id from the parameter and fetches the product details based on the id
   */
  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.createForm();
    this.productService.getProductById(this.productId).subscribe({
      next: (product: IProduct) => {
        this.product = product;
        this.editProductForm.patchValue(product);
      },
      error: (error) => {
        console.error('Error fetching product:', error);
      }
    });
  }


  /**
   * creates a reactive form for editing the product with validations
   */
  createForm(): void {
    this.editProductForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }


  /**
   * updates the product details if the provided form is valid
   */
  onSubmit(): void {
    if (this.editProductForm.valid) {
      const updatedProduct = { ...this.product, ...this.editProductForm.value };
      this.productService.updateProduct(updatedProduct).subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error updating product:', error);
        }
      });
    }
  }
}