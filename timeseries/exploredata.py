import sqlite3
import pandas as pd
import matplotlib.pyplot as plt


class DataManager:
    def __init__(self):

        self._unused = ["a0", "a1", "a11", "a12", "a15",
                    "a16", "a17", "a18", "a19", "a2", "a20", "a3", "a7", "a8"]

        self._used = ['id', 'TimeStamp', "a0","a1", "a2", "a3", "a4", "a5","a6", "a7", "a8",
                    "a9", "a10","a11","a12", "a13", "a14", "a15","a16", "a17", "a18", "a19", "a20", "a21"]
    
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

    def _process_df(self, df):
        
        df.drop(df.index[0], inplace=True)

        ## FIX DATETIME, resampling
        datetime_rowid = df['time'].map(lambda t: pd.to_datetime(t, format='%Y-%m-%d %H:%M:%S'))
        df.index = datetime_rowid

        ## CHANGE COLUMN NAMES
        df.columns = self._used

        to_drop = ['TimeStamp', 'id' ] + self._unused

        df.drop(to_drop, axis = 1, inplace = True)
        
        return df

    def df_to_series(self, df, period):
        #df_c = df.rolling(10,  min_periods=1).mean()
        #df_c = df[["a4", "a5", "a6"]].rolling(10).sum()#.cumsum()
        df_series = df.rolling(period).mean()#.cumsum()

        return df_series

    def plot_df(self, df_series):
        #plt.figure()
        df_series.plot(figsize=(20,10),sort_columns=True, logy=False);
        plt.show()
        #plt.savefig('plots/mydb_2_plot_log.png', format='png', dpi=300)

    def get_df(self, database):
        df = self._create_df_from_sql(database)
        df = self._process_df(df)
        return df

if __name__ == '__main__':
    model = DataManager()    
    database = "./mydb_2.sqlite3"

    # Clean dataframe
    df = model.get_df(database)

    # Convert to series
    series = model.df_to_series(df, '240s')

    # Plot
    model.plot_df(series)

