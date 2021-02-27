interface NPSProps {
    detractor: number,
    promoters: number,
    passive: number,
    totalAnswers: number,
    nps: number
}


const NPSView = {
    render(nps: NPSProps){
        return{
            detractor: nps.detractor,
            promoters: nps.promoters,
            passive: nps.passive,
            totalAnswers: nps.totalAnswers,
            nps: nps.nps.toFixed(2)
        }
    }
}

export default NPSView