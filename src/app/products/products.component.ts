import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  modalRef?: BsModalRef;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _productsService: ProductsService,
    private _router: Router,
    private modalService: BsModalService
  ) {
    console.log('constructer called');
  }

  selectedData: any;
  products: any = [];
  productsForm: any;
  statusMsg: string = '';

  openModal(template: TemplateRef<any>, statusMsg?: any, data?: any) {
    this.modalRef = this.modalService.show(template);
    this.statusMsg = statusMsg;
    this.selectedData = data;

    if (statusMsg === 'UPDATE') {
      this.productsForm.patchValue(data);
    }
    if (statusMsg === 'DELETE') {
    }
    if (statusMsg === 'CREATE') {
      this.productsForm.reset();
    }
  }

  closeModal() {
    this.modalRef?.hide();
    this.productsForm.reset();
  }

  getAllProducts() {
    this._productsService.getAllProducts().subscribe(
      (resp) => {
        this.products = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.productsForm = this.fb.group({
      name: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
    this.getAllProducts();
  }

  onSubmit() {
    const data = this.productsForm.value;
    if (this.statusMsg === 'UPDATE') {
      this._productsService
        .updateproduct(this.selectedData?.id, data)
        .subscribe(
          (resp: any) => {
            if (resp.id) {
              this.toastr.success('Updated Successfully!');
              this.closeModal();
              this.getAllProducts();
            }
          },
          (err) => {
            console.log('err', err);
          }
        );
    }

    if (this.statusMsg === 'CREATE') {
      this._productsService.createProduct(data).subscribe(
        (resp: any) => {
          if (resp.id) {
            this.toastr.success('Created Successfully!');
            this.closeModal();
            this.getAllProducts();
          }
        },
        (err) => {
          console.log('err', err);
        }
      );
    }
  }

  confirm(): void {
    this.modalRef?.hide();
    this._productsService.deleteProduct(this.selectedData?.id).subscribe(
      (resp: any) => {
        this.toastr.success('Deleted Successfully!');
        this.closeModal();
        this.getAllProducts();
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
