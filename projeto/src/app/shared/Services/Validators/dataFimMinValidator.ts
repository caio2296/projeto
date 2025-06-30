import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dataFimMinValidator(getDataInicio: () => string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dataFim = control.value;
    const dataInicio = getDataInicio();

    if (!dataFim || !dataInicio) {
      return null;  // Não valida se algum estiver vazio
    }

    if (dataFim < dataInicio) {
      return { dataFimMin: true };  // Erro: dataFim menor que dataInicio
    }

    return null;  // Válido
  };
}
