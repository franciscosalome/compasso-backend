const connection = require('../database/connection');
module.exports = {
    async getCities(request, response) {
        var { searchTerm = '%%', column = 'id', page = 1, limit = 20} = request.query
        if (!searchTerm) {
            searchTerm = '%%'
            column = 'id'
        }
        const [countCitiesList] = await connection('cities').count();
        const citiesListQuery = await connection('cities')
            .limit(limit)
            .offset((page - 1) * limit)
            .select(['*'])
            .where(column, 'like', `%${searchTerm}%`)
            .orderBy([{ column: 'city_name', column: 'uf'}])

        response.header('X-Total-Count', countCitiesList['count(*)']);
        return response.json(citiesListQuery);
    },
    async registerNewcity(request, response){
        const { cityName, uf } = request.body
        if(!!cityName && !!uf){
            const [verifyIfCityExists] = await connection('cities')
                .count()
                .where('city_name','=',cityName)
                .andWhere('uf','=',uf)
        try{
            if(!verifyIfCityExists['count(*)']){
                await connection('cities')
                .insert({
                    city_name : cityName,
                    uf: uf
                })
                return response.json('City successfully registered')
            }else{
                return response.status(401).json('This city already registered!')
            }
        }catch{
            return response.status(401).json('There was an error. Please try again')
        }
        }else{
            return response.status(401).json('Please insert the cityName and uf. ')
        }        
    }

}