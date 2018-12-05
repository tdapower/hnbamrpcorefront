import { MedicalTest } from "../../medicaltest/models/medicalTest.model";

export class MedicalLetter {
    SeqId : number ;
    AssureId : number ;
    MainId : number ;
    HospitalId : number ;
    LetterDate :  string;
    LetterType :  string;
    SignPersonUserCode :  string;
    Document :  string;
    SystemDate :  string;
    GeneratedUser :  string;
    SelectedMedicalTests:number[];
}