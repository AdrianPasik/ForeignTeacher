import { Component, input } from '@angular/core';
import { Progress } from '../../services/persistence/progress';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-display-result',
    imports: [CommonModule, MatIconModule],
    templateUrl: './display-result.html',
    styleUrl: './display-result.css',
})
export class DisplayResult {
    progressService = input.required<Progress | null>();
}
