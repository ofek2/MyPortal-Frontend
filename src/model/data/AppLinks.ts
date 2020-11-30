import idf from '../../assets/images/idf.png';
import kitbag from '../../assets/images/kitbag.png';
import madim from '../../assets/images/madim.png';
import cactus from '../../assets/images/cactus.png';
import smartbase from '../../assets/images/smartbase.png';
import academy from '../../assets/images/academy.png';

interface ILink {
    name: string,
    url?: string,
    image: any,
    soon?: boolean
}

const applinks: ILink[] = [
    {
        name: "אתר המילואים",
        url: "https://www.miluim.idf.il",
        image: idf
    },
    {
        name: 'אקדמיה - קטלוג קורסים צה"לי',
        url: "https://academy.digital.idf.il",
        image: academy
    },
    {
        name: 'הצב"ר',
        url: "https://clearance.medical.idf.il",
        image: cactus
    },
    {
        name: "קיטבג",
        url: "https://kitbag.prat.idf.il/",
        image: kitbag
    },
    {
        name: "מדים אקספרס",
        url: "https://madim.prat.idf.il",
        image: madim
    },
    {
        name: "Smart Base",
        url: "https://base.idf.il",
        image: smartbase,
    },
    
]

export default applinks;