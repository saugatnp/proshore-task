import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  productForm: FormGroup;

  /**
   * 
   * creates a reactive form for adding a new product with validations
   */
  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }


  /**
   * postt the product if the provided form is valid
   */
  onSubmit() {
    if (this.productForm.valid) {
      const newProduct: IProduct = this.productForm.value;
      this.productService.addProduct(newProduct).subscribe({
        next: (response) => {
          console.log('Product added successfully:', response);
          this.productForm.reset();
        },
        error: (error) => {
          console.error('Error adding product:', error);
        }
      });
    }
  }
}
