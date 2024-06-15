import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AulaModalComponent } from '../../shared/components/aula-modal/aula-modal.component';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';

interface Aula {
  id: number;
  nombre: string;
  latitud: number;
  longitud: number;
  facultad: {
    id: number | null;
    nombre: string;
  };
}

@Component({
  selector: 'app-aulas',
  standalone: true,
  imports: [CommonModule, FormsModule, AulaModalComponent, ConfirmModalComponent],
  templateUrl: './aulas.component.html',
  styleUrls: ['./aulas.component.css']
})
export class AulasComponent implements OnInit {
  aulas: Aula[] = [];
  selectedAula: Aula = { id: 0, nombre: '', latitud: 0, longitud: 0, facultad: { id: null, nombre: '' } };
  showModal = false;
  showConfirmModal = false;
  isEditMode = false;
  aulaIdToDelete: number | null = null;
  toastMessage: string | null = null;
  toastClass: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAulas();
  }

  loadAulas() {
    this.http.get<Aula[]>('http://192.168.0.7/aulas/').subscribe(
      data => {
        this.aulas = data;
      },
      error => {
        console.error('Error loading aulas', error);
      }
    );
  }

  editAula(aulaId: number) {
    this.selectedAula = this.aulas.find(aula => aula.id === aulaId) || this.selectedAula;
    this.isEditMode = true;
    this.showModal = true;
  }

  addAula() {
    this.selectedAula = { id: 0, nombre: '', latitud: 0, longitud: 0, facultad: { id: null, nombre: '' } };
    this.isEditMode = false;
    this.showModal = true;
  }

  confirmDelete(aulaId: number) {
    this.aulaIdToDelete = aulaId;
    this.showConfirmModal = true;
  }

  deleteAula() {
    if (this.aulaIdToDelete !== null) {
      this.http.delete(`http://192.168.0.7/aulas/${this.aulaIdToDelete}`).subscribe(
        () => {
          this.showToast('Aula eliminada con éxito', 'success');
          this.loadAulas(); // Recargar la lista de aulas después de eliminar
          this.aulaIdToDelete = null;
          this.showConfirmModal = false;
        },
        error => {
          this.showToast('Error al eliminar el aula', 'error');
          console.error('Error deleting aula', error);
        }
      );
    }
  }

  cancelDelete() {
    this.aulaIdToDelete = null;
    this.showConfirmModal = false;
  }

  saveAula(aula: Aula) {
    if (this.isEditMode) {
      // Lógica para actualizar el aula
      this.http.put<Aula>(`http://192.168.0.7/aulas/${aula.id}`, aula).subscribe(
        response => {
          this.showToast('Aula actualizada con éxito', 'success');
          this.loadAulas(); // Recargar la lista de aulas
        },
        error => {
          this.showToast('Error al actualizar el aula', 'error');
          console.error('Error updating aula', error);
        }
      );
    } else {
      // Lógica para crear un nuevo aula
      this.http.post<Aula>('http://192.168.0.7/aulas/', aula).subscribe(
        response => {
          this.showToast('Aula creada con éxito', 'success');
          this.loadAulas(); // Recargar la lista de aulas
        },
        error => {
          this.showToast('Error al crear el aula', 'error');
          console.error('Error creating aula', error);
        }
      );
    }
    this.handleCloseModal();
  }

  handleCloseModal() {
    this.showModal = false;
  }

  handleCloseConfirmModal() {
    this.showConfirmModal = false;
  }

  showToast(message: string, type: string) {
    this.toastMessage = message;
    this.toastClass = type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
    setTimeout(() => {
      this.toastMessage = null;
    }, 2000);
  }
}
