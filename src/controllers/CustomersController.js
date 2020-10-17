const connection = require('../database/connection');
module.exports = {
    async getCustomers(request, response) {
        var { searchTerm = '', column = 'customers.id', page = 1, limit = 20} = request.query
        const {id} = request.params //este método está preparado tanto para receber params quanto queries
        if(!id){    
            if (!searchTerm) {
                searchTerm = '%%'
                column = 'customers.id'
            }else{
                searchTerm = `%${searchTerm}%`
                console.log(searchTerm)
            }
        }else{
            searchTerm = id
        }
        const [countCustomersList] = await connection('customers').count();
        const customersListQuery = await connection('customers')
            .limit(limit)
            .offset((page - 1) * limit)
            .select([
                'customers.id',
                'name',
                'gender',
                'date_of_birth',
                'cities.city_name',
                'cities.uf'
                ])
            .leftJoin('cities','cities.id','=','customers.city_id')
            .where(column, 'like', searchTerm)
            .orderBy([{ column: 'customers.id'}])

            //gera a idade a partir da data de nascimento
            customersListQuery.forEach(el => { 
                var birthDate = String(el.date_of_birth)
                var actualDate = new Date()
                var age = 0
                if(birthDate.slice(8,9) < actualDate.getDay() && birthDate.slice(5,7) < actualDate.getMonth()){
                    age = actualDate.getFullYear() - birthDate.slice(0, 4)
                }else{
                    age = actualDate.getFullYear() - birthDate.slice(0, 4) -1
            }
            el.age = age
            });
        response.header('X-Total-Count', countCustomersList['count(*)']);
        return response.json(customersListQuery);
    },

    async registerNewCustomer(request, response){
        const { name, gender, date_of_birth, city_id } = request.body

        if(!!name && !!gender, !!date_of_birth, !!city_id){
            const [verifyIfCustomerExists] = await connection('customers').count().where('name','=',name).andWhere('date_of_birth','=',date_of_birth)
            const verifyDate = new Date(date_of_birth)
            if(!verifyIfCustomerExists['count(*)']){
                if(verifyDate != 'Invalid Date'){ //método para verificar se a data lançada pelo usuário é válida
                    await connection('customers')
                    .insert({
                        name,
                        gender,
                        date_of_birth,
                        city_id      
                    })
                    return response.json('Customer successfully registered')
                }else{
                    return response.status(401).json('This date format is invalid. Please insert a date format like: yyyy-mm-dd')
                }
                
            }else{
                return response.status(401).json('A customer with this name and date of birth already registered.')
            }
        }else{
            return response.status(401).json('Please insert Name, gender, date_of_birth and city_if.')

        }
        
    },

    async deleteCustomer(request, response){
        const {id} = request.params
        const authorization = request.headers.authorization

        if(authorization == 'root'){
            const [verifyIfCustomerExists] = await connection('customers').count().where('id','=',id)

            if(!!verifyIfCustomerExists['count(*)']){
                try{
                    await connection('customers')
                    .delete()
                    .where('id','=',id)
        
                    return response.json('Customer deleted!')
                }catch(e){
                    return response.status(401).json('There was an error. Please try again')
                }
            }else{
                return response.status(401).json('This user not exists!')
            }           
        }else{
            return response.status(401).json(`You are not allowed to perform this action`)
        }

    },

    async editCustomer(request, response){
        
        const {id} = request.params
        const {name, gender, date_of_birth, city_id} = request.body
        const verifyDate = new Date(date_of_birth)
        
        const authorization = request.headers.authorization

        if(authorization == 'root'){
            const [verifyIfCustomerExists] = await connection('customers').count().where('id','=',id)

            if(!!verifyIfCustomerExists['count(*)']){
                if(verifyDate != 'Invalid Date'){
                    try{
                    await connection('customers')
                    .update({
                        name,
                        gender,
                        date_of_birth,
                        city_id   
                    })
                    .where('id','=', id)
                    return response.json('Customer edited!')
                }catch{
                    return response.status(401).json('There was an error. Please try again')
                }
                }else{
                    return response.status(401).json('This date format is invalid. Please insert a date format like: yyyy-mm-dd')
                }
                
            }else{
                return response.status(401).json('This user not exists!')
            }
        }else{
            return response.status(401).json(`You are not allowed to perform this action`)
        }
    }

}