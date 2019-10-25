import {gql} from 'apollo-boost';

export const GET_COMENZI_CURENT_USER= gql`
query comandas($idFirma: Int, $tipProdus:String) {
        comandas(limit:1000 ,where:{ idFirma:$idFirma, tipProdus:$tipProdus}) {
            id,
            created_at,
            updated_at,
            dataComanda,
            clientClient,
            valoareCatalog,
            discount,
            valoareComanda,
            valoareClientFinal,
            observatii,
            adresaLivrare,
            stadiu,
            tipProdus,
            comandarepers{
                id,
                idComanda{id},
                nrCrt,
                tipSubprodus,
                lungime,
                inaltime,
                deschidere,
                material,
                codMaterial,
                lungimeSnur,
                console,
                buc,
                mp,
                pretCatalog,
                pretCuDiscount,
                pretClientFinal,
                observatii,
                tipProdus,
                denumireProdus,
                denumireSubProdus,
                denumireMaterial,
                }
        } 
}   
`;



export const GET_MATERIALE= gql`
query materials($tipProdus:String) {
        materials(limit:10000 ,where:{ tipProdus:$tipProdus}) {
           key,
           denumire,
           pret,
           atentionare,
           tipMaterial,
           activ
        } 
}   
`;

export const GET_PRETCONSOLE= gql`
query optionals{
        optionals(limit:1 ,where:{ tipProdus:"JV" denumire:"Console"}) {
           pret
        } 
}   
`;



export const CREATE_COMANDA= gql`
mutation CreateComanda(
        $clientClient: String!, 
        $valoareCatalog:Float!, 
        $discount:Int!, 
        $valoareComanda:Float!, 
        $valoareClientFinal:Float!, 
        $observatii:String!, 
        $adresaLivrare:String!,
        $stadiu:String!, 
        $idFirma:ID!, 
        $tipProdus:String!){
        createComanda(input:{data:
                { clientClient:  $clientClient, 
                valoareCatalog:$valoareCatalog, 
                discount: $discount, 
                valoareComanda:$valoareComanda, 
                valoareClientFinal:$valoareClientFinal, 
                observatii:$observatii, 
                adresaLivrare:$adresaLivrare,
                stadiu: $stadiu, 
                idFirma:$idFirma, 
                tipProdus:$tipProdus}}) 
            {comanda{id
            created_at
            updated_at
            dataComanda
            clientClient
            valoareCatalog
            discount
            valoareComanda
            valoareClientFinal
            observatii
            adresaLivrare
            stadiu
            tipProdus
            idFirma{id}
            }}
        }   
`;


export const UPDATE_COMANDA= gql`
mutation UpdateComanda(
$id:ID!,
$clientClient: String!, 
$valoareCatalog:Float!, 
$discount:Int!, 
$valoareComanda:Float!, 
$valoareClientFinal:Float!, 
$observatii:String!, 
$adresaLivrare:String!,
$stadiu:String!, 
$idFirma:ID!, 
$tipProdus:String!){
updateComanda( input:{ where:{id:$id} data:
{
clientClient:$clientClient, 
valoareCatalog:$valoareCatalog, 
discount: $discount, 
valoareComanda:$valoareComanda, 
valoareClientFinal:$valoareClientFinal, 
observatii:$observatii, 
adresaLivrare:$adresaLivrare,
stadiu: $stadiu, 
idFirma:$idFirma, 
tipProdus:$tipProdus}}) 
{comanda{id
created_at
updated_at
dataComanda
clientClient
valoareCatalog
discount
valoareComanda
valoareClientFinal
observatii
adresaLivrare
stadiu
tipProdus
idFirma{id}
}}
}   
`;




export const CREATE_REPER= gql`
mutation CreateComandareper(
        $idComanda:ID!,
        $nrCrt:Int,
        $tipSubprodus:Int!,
        $lungime:Int,
        $inaltime:Int,
        $deschidere:String,
        $material:Int,
        $codMaterial:String,
        $lungimeSnur:Int,
        $console:Int,
        $buc:Int,
        $mp:Float,
        $pretCatalog:Float,
        $tipProdus:String!,
        $denumireProdus:String,
        $denumireSubProdus:String,
        $denumireMaterial:String)
{
        createComandareper(input:{data:
                { 
                        idComanda:$idComanda,
                        nrCrt:$nrCrt,
                        tipSubprodus:$tipSubprodus,
                        lungime:$lungime,
                        inaltime: $inaltime,
                        deschidere:$deschidere,
                        material:$material,
                        codMaterial:$codMaterial,
                        lungimeSnur:$lungimeSnur,
                        console:$console,
                        buc:$buc,
                        mp:$mp,
                        pretCatalog:$pretCatalog,
                        tipProdus:$tipProdus,
                        denumireProdus:$denumireProdus,
                        denumireSubProdus:$denumireSubProdus,
                        denumireMaterial:$denumireMaterial
                }}) 
            {comandareper{               
                id
                created_at
                updated_at
                idComanda{id}
                nrCrt
                tipSubprodus
                lungime
                inaltime
                deschidere
                material
                codMaterial
                lungimeSnur
                console
                buc
                mp
                pretCatalog
                tipProdus
                denumireProdus
                denumireSubProdus
                denumireMaterial
            }}
        }
`;
