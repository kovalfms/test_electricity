export class World {
    constructor() {
        this.households = []
        this.powerPlants = []
    }

    createPowerPlant() {
        const powerPlant = {
            id: Math.floor(Math.random() * 100),
            online: true
        }
        this.powerPlants.push(powerPlant)
        return powerPlant
    }

    createHousehold() {
        const household = {
            id: Math.floor(Math.random() * 100),
            connectionHouseToPlants: [],
            connectionHouseToHouse: []
        }
        this.households.push(household)
        return household
    }

    connectHouseholdToPowerPlant(household, powerPlant) {
        household.connectionHouseToPlants.push({
            householdId: household.id,
            powerPlantId: powerPlant.id
        })
    }

    connectHouseholdToHousehold(household1, household2) {
        household.connectionHouseToHouse.push({
            householdOneId: household1.id,
            householdTwoId: household2.id
        })
        console.log(household)
    }

    disconnectHouseholdFromPowerPlant(household, powerPlant) {
        household.connectionHouseToPlants = household.connectionHouseToPlants.filter(el =>
            el.householdId !== household.id || el.powerPlantId !== powerPlant.id)
    }

    killPowerPlant(powerPlant) {
        powerPlant.online = false
    }

    repairPowerPlant(powerPlant) {
        powerPlant.online = true
    }

    householdHasEletricity(household) {
        const hasElectricity = []

        household.connectionHouseToPlants.forEach(el => {
            const plant = this.powerPlants.find((plant => plant.id === el.powerPlantId))

            if (!hasElectricity.includes(el.householdId) && plant.online) {
                hasElectricity.push(el.householdId)
            }
        })

        household.connectionHouseToHouse.forEach(el => {
            const house1_id = el.householdOneId
            const house2_id = el.householdTwoId

            if (!hasElectricity.includes(house1_id) && hasElectricity.includes(house2_id)) {
                hasElectricity.push(house1_id);
            }
            if (!hasElectricity.includes(house2_id) && hasElectricity.includes(house1_id)) {
                hasElectricity.push(house2_id);
            }
        });
        return hasElectricity.includes(household.id)
    }
}
