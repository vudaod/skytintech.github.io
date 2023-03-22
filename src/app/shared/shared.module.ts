import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { BasePreviewComponent } from './base-preview/base-preview.component';
import { DocumentViewComponent } from './document-view/document-view.component';
import { HasClaimDirective } from './has-claim.directive';
import { PipesModule } from './pipes/pipes.module';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { OfficeViewerComponent } from './office-viewer/office-viewer.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { TextPreviewComponent } from './text-preview/text-preview.component';
import { AudioPreviewComponent } from './audio-preview/audio-preview.component';
import { VideoPreviewComponent } from './video-preview/video-preview.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  exports: [
    HasClaimDirective,
    DocumentViewComponent,
    OverlayModule,
    ImagePreviewComponent,
    BasePreviewComponent,
    AudioPreviewComponent,
    VideoPreviewComponent,
    TranslateModule
  ],
  declarations: [
    HasClaimDirective,
    DocumentViewComponent,
    ImagePreviewComponent,
    BasePreviewComponent,
    PdfViewerComponent,
    TextPreviewComponent,
    OfficeViewerComponent,
    AudioPreviewComponent,
    VideoPreviewComponent],
  imports: [
    CommonModule,
    OverlayModule,
    NgxDocViewerModule,
    NgxExtendedPdfViewerModule,
    PipesModule
  ]
})
export class SharedModule { }
