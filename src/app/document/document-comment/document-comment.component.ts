import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { DocumentComment } from '@core/domain-classes/document-comment';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { DocumentCommentService } from './document-comment.service';

@Component({
  selector: 'app-document-comment',
  templateUrl: './document-comment.component.html',
  styleUrls: ['./document-comment.component.css']
})
export class DocumentCommentComponent extends BaseComponent implements OnInit {

  commentForm: UntypedFormGroup;
  documentComments: DocumentComment[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private documentCommentService: DocumentCommentService,
    private dialogRef: MatDialogRef<DocumentCommentComponent>,
    private commonDialogService: CommonDialogService,
    private translationService: TranslationService) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
    this.getDocumentComment();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createForm() {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required]]
    });
  }
  getDocumentComment() {
    this.sub$.sink = this.documentCommentService.getDocumentComment(this.data.id)
      .subscribe((c: DocumentComment[]) => {
        this.documentComments = c;
      })
  }
  patchComment(comment: string) {
    this.commentForm.patchValue({
      comment: comment
    });
  }
  addComment() {
    if (this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }
    const documentComment: DocumentComment = {
      documentId: this.data.id,
      comment: this.commentForm.get('comment').value
    };
    this.sub$.sink = this.documentCommentService.saveDocumentComment(documentComment)
      .subscribe((c: DocumentComment) => {
        this.patchComment('');
        this.commentForm.markAsUntouched();
        this.getDocumentComment();
      });
  }
  onDelete(id: string) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')}?`)
      .subscribe((isTrue: boolean) => {
        if (isTrue) {
          this.sub$.sink = this.documentCommentService.deleteDocumentComment(id)
            .subscribe(() => {
              this.getDocumentComment();
            });
        }
      });
  }

}
