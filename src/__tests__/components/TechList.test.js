import '@testing-library/jest-dom/extend-expect';
import "@testing-library/react/dont-cleanup-after-each";
import 'jest-localstorage-mock';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { render, fireEvent, cleanup } from '@testing-library/react';

//import { addTech } from '~/store/modules/techs/actions';
import {addTech} from '../../components/store/modules/techs/actions';
import TechList from '~/components/TechList';

jest.mock('react-redux');


//<ul data-testid="tech-list"></ul> exemplo de como ficaria o getByTestId

describe('TechList component', () => {

    afterEach(() => cleanup());
    
    it('should render tech list', () => {
        
        // cb => callback
        useSelector.mockImplementation(cb => cb({
            techs: ['Node.js', 'ReactJS']
        }));

        const { getByTestId, getByText, debug } = render(<TechList />);

        //debug();

        expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
        expect(getByTestId('tech-list')).toContainElement(getByText('ReactJS'));

    
    
    });

    it('should be able to add new tech', () => {
       const { getByTestId, getByLabelText } = render(<TechList />);

        const dispatch = jest.fn();

        useDispatch.mockReturnValue(dispatch);

       fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js'} });
       fireEvent.submit(getByTestId('tech-form'));

       //console.log(dispatch.mock.calls);

       expect(dispatch).toHaveBeenCalledWith(addTech('Node.js'));


    });
    
    {/**

    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => cleanup());
  
    it('should be able to add new tech', () => {
        const { getByText, getByTestId, debug, getByLabelText } = render(<TechList />);

        //debug();
        
        //<input onChange={e => e.target.value} /> o que pegamos no onchange
        
        //<label htmlFor="tech">tech</label>
        //<input id="tech" /> como ele buscaria
        fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } } );
        fireEvent.submit(getByTestId('tech-form'));


        //fireEvent.click(getByText('Adicionar'));

        //debug();

        expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
        expect(getByLabelText('Tech')).toHaveValue('');
    });
   


    it('should store techs in storage', () => {
      
        let {  getByTestId,  getByLabelText, getByText } = render(<TechList />);
     
       
        fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } } );
        fireEvent.submit(getByTestId('tech-form'));

       cleanup();
  

        ({  getByTestId,  getByLabelText, getByText } = render(<TechList />));

        expect(localStorage.setItem).toHaveBeenCalledWith('techs', JSON.stringify(['Node.js']));
        expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));

    })
     */}


    
   
});