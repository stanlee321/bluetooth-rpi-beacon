import sqlite3
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

class DataManager:
    def __init__(self):
        """
        X = Orange (a5)
        Y = Green (a6)
        Z = Blue (a4)

        Force = a13
        """
        # for all the xyz
        #self._unused = ["a0", "a1", "a11", "a12", "a15",
        #            "a16", "a17", "a18", "a19", "a2", "a20", "a3", "a7", "a8",
        #            "a9", "a10", "a14", "a21"]
        
        ################## For explore
        #self._used = ['id', 'TimeStamp', "a0","a1", "a2", "a3", "a4", "a5","a6", "a7", "a8",
        #            "a9", "a10","a11","a12", "a13", "a14", "a15","a16", "a17", "a18", "a19", "a20", "a21"]
        # For temperature
        #self._unused = list(set(["a0", "a2", "a3", "a4"] + self._used) - set(["a21"]))

        # For ALl

        # For unknow periodic something
        #self._unused = ["a0", "a1", "a2", "a4", "a21", "a20", "a12", "a15", "a10", "a19", "a11", "a6", "a7", "a3", "a8",
        #                                         "a14", "a15", "a16", "a17", "a18"]

    
        self._unused = []
        self._used = ['id', "x", "y", "z", "time", "temp", "signal"]

    def _create_connection(self, db_file):
        """ create a database connection to the SQLite database
            specified by the db_file
        :param db_file: database file
        :return: Connection object or None
        """
        try:
            conn = sqlite3.connect(db_file)
            return conn
        except Exception as e:
            print(e)
    
        return None

    def _read_as_df(self, conn):
        df = pd.read_sql_query("select * from beacon;", conn)
        return df

    def _create_df_from_sql(self, database):
        # create a database connection
        conn = self._create_connection(database)
        with conn:
            print("...Query all tasks")
            ## select_all_tasks(conn)
            df = self._read_as_df(conn)
        return df

    def _process_df(self, df, use_all=False):
        
        df.drop(df.index[0], inplace=True)

        ## FIX DATETIME, resampling
        datetime_rowid = df['time'].map(lambda t: pd.to_datetime(t, format='%Y-%m-%d %H:%M:%S'))
        df.index = datetime_rowid

        if use_all == False:
            ## CHANGE COLUMN NAMES
            df.columns = self._used

            to_drop = ['time', 'id' ] + self._unused

            df.drop(to_drop, axis = 1, inplace = True)
        else:
            df.columns = self._used 
            print(df.columns)
            to_drop = ['time', 'id' ] + self._unused
            df.drop(to_drop, axis = 1, inplace = True)
        return df

    def df_to_series(self, df, period):
        #df_c = df.rolling(10,  min_periods=1).mean()
        #df_c = df[["a4", "a5", "a6"]].rolling(10).sum()#.cumsum()
        #df_series = df.rolling(period).cumsum()
        
        # Calculate with rolling mean
        df_series = df.rolling(period).mean()
        return df_series

    def plot_df(self, df_series, save=False):
        #plt.figure()

        fig, axes = plt.subplots(nrows=2, ncols=2)

        # Plot  columns by separate
        df_series[['x','y','z']].plot(ax=axes[0,0], figsize=(20,10))
        df_series[['magnitude']].plot(ax=axes[0,1], figsize=(20,10))
        df_series[['signal']].plot(ax=axes[1,0], figsize=(20,10))
        df_series[['temp']].plot(ax=axes[1,1], figsize=(20,10))
        
        # Plot full dataframe into one image
        #df_series.plot(figsize=(20,10),sort_columns=True, logy=False)

        plt.show()
        if save:
            plt.savefig('plots/full_plot.png', format='png', dpi=300)

    def add_magnitude(self, df):
        df['magnitude'] = np.sqrt(df["x"]**2 + df["y"]**2 + df["z"]**2)
        return df

    def get_df(self, database, use_all=False):
        df = self._create_df_from_sql(database)
        df = self._process_df(df, use_all)
        return df

if __name__ == '__main__':
    model = DataManager()

    database = "../telemetry_data.sqlite3"

    # Clean dataframe
    df = model.get_df(database, use_all=False)

    # Add magnitude
    df = model.add_magnitude(df)
    
    # Convert to series with 60 seg window
    series = model.df_to_series(df, '60s')

    # Plot
    model.plot_df(series, save=False)

